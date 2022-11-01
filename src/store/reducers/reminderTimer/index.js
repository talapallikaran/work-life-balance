import moment from "moment";
import { TODO_CREATE_TODO_SUCCESS } from "../../../constants/store";

// The initial state of the App
export const initialState = {
  timer: moment().toDate(),
};

function reminderTimerReducer(state = initialState, action) {
  switch (action.type) {
    case TODO_CREATE_TODO_SUCCESS: {
      let timer = state.timer;
      const newState = {
        timer,
      };
      return newState;
    }
    default:
      return state;
  }
}

export default reminderTimerReducer;
