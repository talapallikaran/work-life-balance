import {
  HABIT_CREATE_SUCCESS,
  HABIT_REMOVE_SUCCESS,
  HABIT_UPDATE_SUCCESS,
} from "../../../constants/store";
import { populateStoredData } from "../../../helper/populateStoredData";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  habits: populateStoredData("habits"),
};

function habitsReducer(state = initialState, action) {
  switch (action.type) {
    case HABIT_CREATE_SUCCESS: {
      const newState = {
        ...state,
        habits: action.payload,
      };

      return newState;
    }
    case HABIT_UPDATE_SUCCESS: {
      const filteredArray = state.habits.filter(
        (habit) => habit.id !== action.payload[0].id
      );
      filteredArray.push(action.payload[0]);
      localStorage.setItem("habits", JSON.stringify(filteredArray));
      const newState = {
        ...state,
        habits: filteredArray,
      };
      return newState;
    }
    case HABIT_REMOVE_SUCCESS: {
      const filteredArray = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
      localStorage.setItem("habits", JSON.stringify(filteredArray));
      const newState = {
        ...state,
        habits: filteredArray,
      };

      return newState;
    }
    default:
      return state;
  }
}

export default habitsReducer;
