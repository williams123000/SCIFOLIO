import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function ModalHobbies({ showModal, setShowModal, data }) {
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState(data);
  const [showModalAdd, setShowModalAdd] = useState(false);
  useEffect(() => {
    console.log(data);
  }, [])

  const handleDelete = async (key) => {
    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_DELETE = import.meta.env.VITE_API_DELETEHOBBIE;
      const URL_Petition = URL + URL_DELETE;
      await axios.delete(URL_Petition, {
        data: {
          uid: sessionStorage.getItem('uid'),
          key: key
        }
      });

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };


  const nameRef = useRef(null);
  const descriptionRef = useRef(null);


  const handleSave = async () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_PUT = import.meta.env.VITE_API_UPLOADINFOABOUT;
      const URL_Petition = URL + URL_PUT ;
      const response = await axios.post(URL_Petition,{
        uid: sessionStorage.getItem('uid'),
        hobbies: [
          {
            Categoria: name,
            Descripcion: description,
          }
        ]
      })
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Modal show={showModal} size='lg' onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Editar resumen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Hobby</th>
                <th className="px-4 py-2 text-left">Resumen</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hobbies.map((hobby, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{hobby.Hobbie}</td>
                  <td className="px-4 py-2 border-t">{hobby.Resume}</td>
                  <td className="px-4 py-2 border-t">
                    <Button
                      onClick={() => handleDelete(hobby.Key)}
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
          <Button variant="primary" >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
        <Modal.Header>
          <Modal.Title>Agregar hobbie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' controlId="floatingSelect" label="Elige un hobbie">
            <Form.Select aria-label="Floating label select example" ref={nameRef}>
              <option>Selecciona una opción</option>
              <option value="Lectura">Lectura</option>
              <option value="Pintura">Pintura</option>
              <option value="Cocina">Cocina</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Música">Música</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="Descripción" className='mb-3'>
            <Form.Control
              ref={descriptionRef}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="d-flex w-100 justify-content-center gap-2">

          <Button variant="outline-primary" onClick={() => {
            setShowModalAdd(false);
            setShowModal(true);
          }}>
            Cerrar
          </Button>

          <Button variant="primary"
            onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalHobbies