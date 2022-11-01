import { connect } from "react-redux";
import { compose } from "redux";
import { createHabit, removeHabit } from "../../store/actions/habitsActions";
import Habits from "./Habits";

const mapStateToProps = (state) => {
  const { habits } = state.habits;
  return {
    habits,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createHabitAction: (values) => {
    return dispatch(createHabit(dispatch, values));
  },
  removeHabitAction: (values) => {
    return dispatch(removeHabit(dispatch, values));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Habits);
