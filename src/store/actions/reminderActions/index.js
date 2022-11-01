import { REMINDER_TIMER } from "../../../constants/store";

export const reminderTimer = async (dispatch, payload) => {
  try {
    dispatch({
      type: REMINDER_TIMER,
      payload,
    });
  } catch (e) {
    console.error("E", e);
  }
};

export const reminderTimerWrapper = (dispatch) => {
  return (payload) => reminderTimer(dispatch, payload);
};
