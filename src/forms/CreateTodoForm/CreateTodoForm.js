import { Button, Form } from "react-bootstrap";
import "./CreateTodoForm.css";
function CreateTodoForm({ onFormSubmit, initialValues, setTodoStates }) {
  const _handleInputChange = (event) => {
    setTodoStates({
      ...initialValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add to-do title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          name="todoTitle"
          onChange={(e) => _handleInputChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>To-do description</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          placeholder="Add description"
          name="description"
          onChange={(e) => _handleInputChange(e)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Select category</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="category"
          onChange={(e) => _handleInputChange(e)}
        >
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default CreateTodoForm;
