import moment from "moment";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Header from "../../component/Header";
import { getHabitReminder } from "../../config/reminder";
import { DASHBOARD, HABITS, TODO } from "../../constants/route";
import DailyTodo from "../DailyTodo";
import Habits from "../Habits";
import "./Main.css";

function Main({ todos, habits, updateHabitAction }) {
  const [timer, setTimer] = useState(moment().toDate());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [askForUser, setAskForUser] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [openReminderModal, setOpenReminderModal] = useState({
    reminderDetails: {},
  });
  const [repeatAgain, setRepeatAgain] = useState("");
  const getTodos = todos && todos.length > 0 ? todos : false;
  const gethabits = habits && habits.length > 0 ? habits : false;

  const getCompletedTodos =
    todos &&
    todos.length > 0 &&
    todos.filter((todo) => todo.isCompleted === true);
  const getCompletedHabits =
    habits &&
    habits.length > 0 &&
    habits.filter((habit) => habit.isCompleted === true);

  useEffect(() => {
    Notification.requestPermission();
    const getCurrentUser = localStorage.getItem("user");
    if (!getCurrentUser) {
      setAskForUser(true);
    } else {
      setAskForUser(false);
    }
  });

  useEffect(() => {
    setInterval(() => {
      const currentTime = moment().toDate();
      const getReminderDataIfAny = getHabitReminder(currentTime);
      const isRemind = getReminderDataIfAny && getReminderDataIfAny.length > 0;
      if (isRemind) {
        setOpenReminderModal({
          reminderDetails: getHabitReminder(currentTime)[0],
        });
        new Notification(
          `Hey you have a reminder!${
            getHabitReminder(currentTime)[0].habitTitle
          } `
        );
        setIsModalOpen(true);
      }
      setTimer(currentTime);
    }, 1000);
  }, []);

  const _handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const _handleHabitReminderUpdate = (event) => {
    const updateHabitReminder =
      habits &&
      habits.length > 0 &&
      habits.map((habit) => {
        if (habit.id === openReminderModal.reminderDetails.id) {
          habit.reminderAddedTime = moment(habit.reminderAddedTime).add(
            parseInt(event.target.value),
            "minutes"
          );
          return habit;
        }
        return habit;
      });
    setIsModalOpen(false);
    updateHabitAction(updateHabitReminder);
    setOpenReminderModal({
      ...openReminderModal,
    });
  };

  const _handleHabitFinish = (habitData) => {
    const updateHabitReminder =
      habits &&
      habits.length > 0 &&
      habits.map((habit) => {
        if (habit.id === habitData.id) {
          habit["isCompleted"] = true;
          return habit;
        }
        return habit;
      });
    setIsModalOpen(false);
    updateHabitAction(updateHabitReminder);
    setOpenReminderModal({
      reminderDetails: openReminderModal,
      isOpen: false,
    });
  };

  const getStarted = () => {
    localStorage.setItem("user", userName);
  };

  return (
    <div className="main-application">
      {askForUser ? (
        <div className="user-name">
          <div className="input-wrapper">
            <label>What is your name!</label>
            <input
              type="text"
              name="user"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
            />
            <Button type="button" onClick={() => getStarted()}>
              Get Started!
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Container>
            <Row>
              <Col sm={4} className="header-column">
                <div className="App">
                  <Header setCurrentPage={setCurrentPage} />
                </div>
              </Col>
              <Col sm={8} className="header-column">
                <div class="notification-bar">
                  <div
                    className={`user-todo-status ${
                      gethabits ? "" : "not-added"
                    } `}
                  >
                    {(getCompletedHabits &&
                      getCompletedHabits.length > 0 &&
                      getCompletedHabits.length) ||
                      0}
                    /{(gethabits && gethabits.length) || 0} Habits
                  </div>
                  <div
                    className={`user-todo-status ${
                      getTodos ? "" : "not-added"
                    } `}
                  >
                    {(getCompletedTodos &&
                      getCompletedTodos.length > 0 &&
                      getCompletedTodos.length) ||
                      0}
                    /{(getTodos && getTodos.length) || 0} Daily goals
                  </div>
                  <div className="user-introduction">Hi, {userName}</div>
                </div>
                {currentPage === DASHBOARD && (
                  <div className="Dashboard">
                    <Row>
                      <Col sm={6}>
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
                                        <li
                                          className={`${
                                            habit.isCompleted ? "completed" : ""
                                          }`}
                                        >
                                          {habit.habitTitle}
                                        </li>
                                      </>
                                    );
                                  })}
                                <li onClick={() => setCurrentPage(HABITS)}>
                                  See all
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      <Col sm={6}>
                        <Card className="todo-page">
                          <Row>
                            <Col sm={12}>
                              <Container>
                                <Row className="page-title align-items-center">
                                  <Col sm={8}>
                                    <div className="title">Daily goals</div>
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
                              <ul className="todo-list">
                                {todos &&
                                  todos.length > 0 &&
                                  todos.map((todo) => {
                                    return (
                                      <>
                                        <li
                                          className={`${
                                            todo.isCompleted ? "completed" : ""
                                          }`}
                                        >
                                          {todo.todoTitle}
                                        </li>
                                      </>
                                    );
                                  })}
                                <li onClick={() => setCurrentPage(TODO)}>
                                  See all
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                    <Row></Row>
                  </div>
                )}
                {currentPage === TODO && <DailyTodo />}
                {currentPage === HABITS && <Habits />}
              </Col>
            </Row>
          </Container>
          <Modal
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Hey!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2>
                {openReminderModal.reminderDetails &&
                  openReminderModal.reminderDetails.habitTitle}
              </h2>
              <Form onSubmit={() => _handleFormSubmit()}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Remind after</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="reminderAfterTime"
                    onChange={(e) => _handleHabitReminderUpdate(e)}
                  >
                    <option>Open this select menu</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() =>
                  _handleHabitFinish(openReminderModal.reminderDetails)
                }
              >
                Stop reminding
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Main;
