import {
  TODO_COMPLETED_SUCCESS,
  TODO_CREATE_TODO_SUCCESS,
  TODO_REMOVED_SUCCESS,
  TODO_UPDATED_FAILED,
  TODO_UPDATED_SUCCESS,
} from "../../../constants/store";
import { populateStoredData } from "../../../helper/populateStoredData";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  todos: populateStoredData("todo"),
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case TODO_CREATE_TODO_SUCCESS: {
      const newState = {
        ...state,
        todos: action.payload,
      };

      return newState;
    }
    case TODO_COMPLETED_SUCCESS: {
      const alterTodoDetails = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo["isCompleted"] = true;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(alterTodoDetails));
      const newState = {
        ...state,
        todos: alterTodoDetails,
      };

      return newState;
    }
    case TODO_UPDATED_SUCCESS: {
      const filteredArray = state.todos.filter(
        (todo) => todo.id !== action.payload[0].id
      );
      filteredArray.push(action.payload[0]);
      localStorage.setItem("todo", JSON.stringify(filteredArray));
      const newState = {
        ...state,
        todos: filteredArray,
      };
      return newState;
    }
    case TODO_REMOVED_SUCCESS: {
      const filteredArray = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(filteredArray));
      const newState = {
        ...state,
        todos: filteredArray,
      };

      return newState;
    }
    default:
      return state;
  }
}

export default todoReducer;
