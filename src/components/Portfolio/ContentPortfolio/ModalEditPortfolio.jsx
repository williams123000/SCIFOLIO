import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

function ModalEditPortfolio({ show, onHide }) {
  const [category, setCategory] = useState('');
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Portafolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text" placeholder="Titulo" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Investigaciones">Investigaciones</option>
                <option value="Publicaciones">Publicaciones</option>
                <option value="Experimentos">Experimentos</option>
              </Form.Select>
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => alert(`Categoría seleccionada: ${category}`)}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )

}

export default ModalEditPortfolio;