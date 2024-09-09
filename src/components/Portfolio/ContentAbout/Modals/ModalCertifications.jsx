import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function ModalCertifications({ showModal, setShowModal, data }) {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState(data);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const nameRef = useRef(null);


  const handleDelete = async (id) => {
    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_DELETE = import.meta.env.VITE_API_DELETECERTIFICATION;
      const URL_Petition = URL + URL_DELETE;
      await axios.delete(URL_Petition, {
        data: {
          uid: sessionStorage.getItem('uid'),
          id: id
        }
      });

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const name = nameRef.current.value;
    console.log(name)

    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_PUT = import.meta.env.VITE_API_UPLOADINFOABOUT;
      const URL_Petition = URL + URL_PUT;
      await axios.post(URL_Petition, {
        uid: sessionStorage.getItem('uid'),
        certificates: {
            name
        }
        
      });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal show={showModal} size='lg' onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Editar Certificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((certification, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{certification}</td>
                  <td className="px-4 py-2 border-t">
                    <Button
                      onClick={() => handleDelete(certification)}
                      className='d-flex align-items-center'
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            setShowModalAdd(true);
          }}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
        <Modal.Header>
          <Modal.Title>Agregar Certificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' label="Nombre">
            <Form.Control ref={nameRef} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => {
            setShowModalAdd(false);
            setShowModal(true);
          }}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCertifications;
