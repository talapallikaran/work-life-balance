import { connect } from "react-redux";
import { compose } from "redux";
import { updateHabit } from "../../store/actions/habitsActions";
import { reminderTimer } from "../../store/actions/reminderActions";
import { createTodo } from "../../store/actions/todoActions";
import Main from "./Main";

const mapStateToProps = (state) => {
  const { todos } = state.todos;
  const { habits } = state.habits;
  const { timer } = state.reminderTimer;
  return {
    todos,
    timer,
    habits
  };
};

const mapDispatchToProps = (dispatch) => ({
  createTodoAction: (values) => {
    return dispatch(createTodo(dispatch, values));
  },
  updateHabitAction: (values) => {
    return dispatch(updateHabit(dispatch, values));
  },
  reminderTimerAction: (values) => {
    return dispatch(reminderTimer(dispatch, values));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Main);
