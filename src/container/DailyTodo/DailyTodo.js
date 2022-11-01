import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CustomModal } from "../../component";
import { CreateTodoForm } from "../../forms";
import undo from "../../assets/undo.svg";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import "./DailyTodo.css";

function DailyTodo({
  createTodoAction,
  todos,
  completeTodoAction,
  removeTodoAction,
  updateTodoAction,
}) {
  const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);
  const [todoStates, setTodoStates] = useState({
    todoTitle: "",
    description: "",
    category: "",
    todoStatus: "",
  });

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    setShowCreateToDoModal(false);
    createTodoAction(todoStates);
  };

  const _handleTodoRemove = (id) => {
    removeTodoAction(id);
  };
  const _handleTodoUpdate = (id) => {
    updateTodoAction(id);
  };

  const content = (
    <CreateTodoForm
      setTodoStates={setTodoStates}
      initialValues={todoStates}
      onFormSubmit={_handleFormSubmit}
    />
  );
  const todoActionButtons = (todo) => (
    <div className="action-wrapper">
      <Button type="button">
        <img src={undo} alt="undo" onClick={() => _handleTodoUpdate(todo.id)} />
      </Button>
      <Button type="button">
        <img
          src={remove}
          alt="remove"
          onClick={() => _handleTodoRemove(todo.id)}
        />
      </Button>
    </div>
  );

  const _handleCompleteTodo = (todo) => {
    completeTodoAction(todo.id);
  };

  return (
    <div>
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
                        className={`${todo.isCompleted ? "completed" : ""}`}
                        onClick={() => _handleCompleteTodo(todo)}
                      >
                        {todo.todoTitle}
                        {todo.isCompleted ? <span>You have completed this task!</span> : <span>{todo.description}</span>}
                        {todoActionButtons(todo)}
                      </li>
                    </>
                  );
                })}
              <li
                className="add-todo"
                onClick={() => setShowCreateToDoModal(!showCreateToDoModal)}
              >
                Add todo
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
      <CustomModal
        show={showCreateToDoModal}
        onHide={() => setShowCreateToDoModal(false)}
        modalContent={content}
        modalTitle="Create to-do"
        className={"custom-modal"}
      />
    </div>
  );
}

export default DailyTodo;
