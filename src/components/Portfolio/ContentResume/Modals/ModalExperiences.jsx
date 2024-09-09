import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function ModalExperiences({ showModalExperience, setShowModalExperience, data }) {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState(data);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const nameRef = useRef(null);
  const companyRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleDelete = async (id) => {
    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_DELETE = import.meta.env.VITE_API_DELETEEXPERIENCE;
      const URL_Petition = URL + URL_DELETE;
      await axios.delete(URL_Petition, {
        data: {
          uid: sessionStorage.getItem('uid'),
          id: id
        }
      });

      navigate(0); // Refresca la página después de la eliminación
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const name = nameRef.current.value;
    const company = companyRef.current.value;
    const start = startRef.current.value;
    const end = endRef.current.value;

    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_PUT = import.meta.env.VITE_API_UPLOADINFORESUME;
      const URL_Petition = URL + URL_PUT;
      await axios.post(URL_Petition, {
        uid: sessionStorage.getItem('uid'),
        experience: [
          {
            puesto: name,
            compañia: company,
            fechaInicio: start,
            fechaFin: end
          }
        ]
      });
      navigate(0); // Refresca la página después de guardar
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={showModalExperience} size='lg' onHide={() => setShowModalExperience(false)} centered>
        <Modal.Header>
          <Modal.Title>Editar Experiencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Empresa</th>
                <th className="px-4 py-2 text-left">Años</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{experience.Name}</td>
                  <td className="px-4 py-2 border-t">{experience.Company}</td>
                  <td className="px-4 py-2 border-t">{experience.Start} &ndash; {experience.End}</td>
                  <td className="px-4 py-2 border-t">
                    <Button
                      onClick={() => handleDelete(experience.Name)}
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
          <Button variant="outline-primary" onClick={() => setShowModalExperience(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModalExperience(false);
            setShowModalAdd(true);
          }}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
        <Modal.Header>
          <Modal.Title>Agregar Experiencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' label="Puesto">
            <Form.Control ref={nameRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Empresa">
            <Form.Control ref={companyRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Año de inicio">
            <Form.Control type="number" ref={startRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Año de fin">
            <Form.Control type="number" ref={endRef} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => {
            setShowModalAdd(false);
            setShowModalExperience(true);
          }}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExperiences;
