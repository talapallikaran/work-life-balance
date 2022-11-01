import {
  TODO_COMPLETED_IN_PROGRESS,
  TODO_COMPLETED_SUCCESS,
  TODO_CREATE_TODO,
  TODO_CREATE_TODO_FAILED,
  TODO_CREATE_TODO_IN_PROGRESS,
  TODO_CREATE_TODO_SUCCESS,
  TODO_REMOVED_FAILED,
  TODO_REMOVED_SUCCESS,
  TODO_UPDATED_FAILED,
  TODO_UPDATED_SUCCESS,
} from "../../../constants/store";
import { ensureTodoData } from "../../../helper/ensureTodoData";

export const createTodo = async (dispatch, payload) => {
  try {
    dispatch({
      type: TODO_CREATE_TODO_IN_PROGRESS,
      payload: [],
    });
    const todosEnsured = ensureTodoData(payload);
    dispatch({
      type: TODO_CREATE_TODO_SUCCESS,
      payload: todosEnsured,
    });
  } catch (e) {
    dispatch({
      type: TODO_CREATE_TODO_FAILED,
      payload: ["Error Occured"],
    });
  }
};

export const createTodoWrapper = (dispatch) => {
  return (payload) => createTodo(dispatch, payload);
};

export const completeTodo = async (dispatch, payload) => {
  try {
    dispatch({
      type: TODO_COMPLETED_IN_PROGRESS,
      payload: [],
    });
    dispatch({
      type: TODO_COMPLETED_SUCCESS,
      payload,
    });
  } catch (e) {
    dispatch({
      type: TODO_COMPLETED_SUCCESS,
      payload: ["Error Occured"],
    });
  }
};

export const completeTodoWrapper = (dispatch) => {
  return (payload) => completeTodo(dispatch, payload);
};

export const updateTodo = async (dispatch, payload) => {
  try {
    dispatch({
      type: TODO_UPDATED_SUCCESS,
      payload,
    });
  } catch (e) {
    dispatch({
      type: TODO_UPDATED_FAILED,
      payload: ["Error Occured"],
    });
  }
};

export const updateTodoWrapper = (dispatch) => {
  return (payload) => updateTodo(dispatch, payload);
};

export const removeTodo = async (dispatch, payload) => {
  try {
    dispatch({
      type: TODO_REMOVED_SUCCESS,
      payload,
    });
  } catch (e) {
    dispatch({
      type: TODO_REMOVED_FAILED,
      payload: ["Error Occured"],
    });
  }
};

export const removeTodoWrapper = (dispatch) => {
  return (payload) => removeTodo(dispatch, payload);
};
