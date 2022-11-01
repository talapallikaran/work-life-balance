import { Button, Form } from "react-bootstrap";
import "./CreateHabitsForm.css";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import moment from "moment";

function CreateHabitsForm({
  onFormSubmit,
  initialValues,
  setHabitStates,
  setRepeateTime,
  repeatTime,
  setShowCreateToDoModal
}) {
  const [reminderDateAndTime, setReminderDataAndTime] = useState(new Date());

  const _handleInputChange = (event) => {
    setHabitStates({
      ...initialValues,
      repeateReminder: repeatTime,
      [event.target.name]: event.target.value,
      reminderAddedTime: moment().toDate(),
    });
  };
  const _handleDateTimeChange = (date) => {
    setHabitStates({
      ...initialValues,
      reminderTime: moment(date).toDate(),
    });
  };

  const _handleRepeatToggleChange = (event) => {
    setRepeateTime(event.target.checked);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add a habit</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          name="habitTitle"
          onChange={(e) => _handleInputChange(e)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Remind after</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="reminderAfterTime"
          onChange={(e) => _handleInputChange(e)}
        >
          <option>Open this select menu</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default CreateHabitsForm;
