import { combineReducers } from "redux";
// import { connectRouter } from "connected-react-router";

// import history from "utils/history";
import todoReducer from "../reducers/todoReducer";
import habitsReducer from "./habitsReducer";
import reminderTimerReducer from "./reminderTimer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    todos: todoReducer,
    habits: habitsReducer,
    reminderTimer: reminderTimerReducer,
    // router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
