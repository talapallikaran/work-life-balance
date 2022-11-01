import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CustomModal } from "../../component";
import { CreateHabitsForm } from "../../forms";
import undo from "../../assets/undo.svg";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import "./Habits.css";
import moment from "moment";

function Habits({ createHabitAction, removeHabitAction, habits }) {
  const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);
  const [repeatTime, setRepeateTime] = useState(false);
  const [habitStates, setHabitStates] = useState({
    habitTitle: "",
    description: "",
    reminderTime: "",
    reminderAfterTime: "",
    repeateReminder: false,
    repeateReminderTimes: 1,
    reminderAddedTime: moment().toDate(),
  });

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    setShowCreateToDoModal(false);
    createHabitAction({
      ...habitStates,
      repeateReminder: repeatTime,
    });
  };

  const content = (
    <CreateHabitsForm
      setHabitStates={setHabitStates}
      initialValues={habitStates}
      setRepeateTime={setRepeateTime}
      repeatTime={repeatTime}
      onFormSubmit={_handleFormSubmit}
      setShowCreateToDoModal={setShowCreateToDoModal}
    />
  );

  const _handleHabitRemove = (id) => {
    removeHabitAction(id);
  };

  const todoActionButtons = (habit) => (
    <div className="action-wrapper">
      <Button type="button">
        <img
          src={remove}
          alt="remove"
          onClick={() => _handleHabitRemove(habit.id)}
        />
      </Button>
    </div>
  );

  return (
    <div>
      <Card className="todo-page">
        <Row>
          <Col sm={12}>
            <Container>
              <Row className="page-title align-items-center">
                <Col sm={8}>
                  <div className="title">Habits</div>
                </Col>
                {/* <Col sm={4}>
                  <Button
                    type="button"
                    onClick={() => setShowCreateToDoModal(!showCreateToDoModal)}
                  >
                    Create new
                  </Button>
                </Col> */}
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <ul className="habits-list">
              {habits &&
                habits.length > 0 &&
                habits.map((habit) => {
                  return (
                    <>
                      <li className={`${habit.isCompleted ? "completed" : ""}`}>
                        {habit.habitTitle}
                        {habit.isCompleted ? (
                          <span>
                            You have completed this reminder for today!
                          </span>
                        ) : (
                          <span>
                            Will be repeated after every{" "}
                            {habit.reminderAfterTime} minutes
                          </span>
                        )}

                        {todoActionButtons(habit)}
                      </li>
                    </>
                  );
                })}
              <li
                className="add-todo"
                onClick={() => setShowCreateToDoModal(!showCreateToDoModal)}
              >
                Add habit
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
      <CustomModal
        show={showCreateToDoModal}
        onHide={() => setShowCreateToDoModal(false)}
        modalContent={content}
        modalTitle="Create Habit"
        className={"custom-modal"}
      />
    </div>
  );
}

export default Habits;
