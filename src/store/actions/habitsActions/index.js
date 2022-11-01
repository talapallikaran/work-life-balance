import {
  HABIT_CREATE_FAILED,
  HABIT_CREATE_IN_PROGRESS,
  HABIT_CREATE_SUCCESS,
  HABIT_REMOVE_FAILED,
  HABIT_REMOVE_IN_PROGRESS,
  HABIT_REMOVE_SUCCESS,
  HABIT_UPDATE_FAILED,
  HABIT_UPDATE_SUCCESS,
} from "../../../constants/store";
import { ensureHabitsData } from "../../../helper/ensureHabitsData";

export const createHabit = async (dispatch, payload) => {
  try {
    dispatch({
      type: HABIT_CREATE_IN_PROGRESS,
      payload: [],
    });
    const habitsEnsured = ensureHabitsData(payload);
    dispatch({
      type: HABIT_CREATE_SUCCESS,
      payload: habitsEnsured,
    });
  } catch (e) {
    dispatch({
      type: HABIT_CREATE_FAILED,
      payload: ["Error Occured"],
    });
  }
};

export const createHabitWrapper = (dispatch) => {
  return (payload) => createHabit(dispatch, payload);
};


export const updateHabit = async (dispatch, payload) => {
  try {
    dispatch({
      type: HABIT_UPDATE_SUCCESS,
      payload,
    });
  } catch (e) {
    dispatch({
      type: HABIT_UPDATE_FAILED,
      payload: ["Error Occured"],
    });
  }
};

export const updateHabitWrapper = (dispatch) => {
  return (payload) => updateHabit(dispatch, payload);
};


export const removeHabit = async (dispatch, payload) => {
  try {
    dispatch({
      type: HABIT_REMOVE_SUCCESS,
      payload,
    });
  } catch (e) {
    dispatch({
      type: HABIT_REMOVE_FAILED,
      payload: ["Error Occured"],
    });
  }
};

export const removeHabitWrapper = (dispatch) => {
  return (payload) => removeHabit(dispatch, payload);
};
