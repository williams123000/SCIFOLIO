import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Form } from 'react-bootstrap';


function ModalEditContact({ show, onHide }) {

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tu ubicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => alert("hola")}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )

}

export default ModalEditContact;