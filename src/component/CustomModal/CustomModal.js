import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CustomModal.css";
function CustomModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={props.className}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modalContent}</Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CustomModal;
