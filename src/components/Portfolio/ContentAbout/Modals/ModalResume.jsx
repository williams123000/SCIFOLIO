import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function ModalResume({ showModalResume, setShowModalResume , data }) {
  const navigate = useNavigate();

  const [resume, setResume] = useState(data);
  const handleSave = async () => {
    const URL = import.meta.env.VITE_URL_API;
    const URL_PUT = import.meta.env.VITE_API_UPLOADINFOABOUT;
    const URL_Petition = URL + URL_PUT ;
    try {
      const response = await axios.post(URL_Petition,{
        uid: sessionStorage.getItem('uid'),
        resume: resume
      })

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Modal show={showModalResume} size='lg' onHide={() => setShowModalResume(false)} centered>
      <Modal.Header>
        <Modal.Title>Editar resumen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingTextarea2" label="Resumen">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '30dvh' }}
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </FloatingLabel>
      </Modal.Body>
      <Modal.Footer className="d-flex w-100 justify-content-center gap-2">

        <Button variant="outline-primary" onClick={() => setShowModalResume(false)}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalResume