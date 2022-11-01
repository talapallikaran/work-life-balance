import { connect } from "react-redux";
import { compose } from "redux";
import { completeTodo, createTodo, removeTodo, updateTodo } from "../../store/actions/todoActions";
import DailyTodo from "./DailyTodo";

const mapStateToProps = (state) => {
  const { todos } = state.todos;
  return {
    todos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createTodoAction: (values) => {
    return dispatch(createTodo(dispatch, values));
  },
  removeTodoAction: (values) => {
    return dispatch(removeTodo(dispatch, values));
  },
  updateTodoAction: (values) => {
    return dispatch(updateTodo(dispatch, values));
  },
  completeTodoAction: (values) => {
    return dispatch(completeTodo(dispatch, values));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DailyTodo);
