import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function ModalEducations({ showModalEducation, setShowModalEducation, data }) {
  const navigate = useNavigate();
  const [educations, setEducations] = useState(data);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const nameRef = useRef(null);
  const schoolRef = useRef(null);
  const yearStartRef = useRef(null);
  const yearEndRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);

  const handleDelete = async (id) => {
    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_DELETE = import.meta.env.VITE_API_DELETEEDUCATION;
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
    const school = schoolRef.current.value;
    const yearStart = yearStartRef.current.value;
    const yearEnd = yearEndRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;

    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_PUT = import.meta.env.VITE_API_UPLOADINFORESUME;
      const URL_Petition = URL + URL_PUT;
      await axios.post(URL_Petition, {
        uid: sessionStorage.getItem('uid'),
        education: [
          {
            nombre: name,
            escuela: school,
            fechaInicio: yearStart,
            fechaFin: yearEnd,
            estado: state,
            pais: country
          }
        ]
      });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal show={showModalEducation} size='lg' onHide={() => setShowModalEducation(false)} centered>
        <Modal.Header>
          <Modal.Title>Editar Educación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Escuela</th>
                <th className="px-4 py-2 text-left">Años</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((education, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{education.Name}</td>
                  <td className="px-4 py-2 border-t">{education.School}</td>
                  <td className="px-4 py-2 border-t">{education.YearStart} &ndash; {education.YearEnd}</td>
                  <td className="px-4 py-2 border-t">
                    <Button
                      onClick={() => handleDelete(education.Name)}
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
          <Button variant="outline-primary" onClick={() => setShowModalEducation(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModalEducation(false);
            setShowModalAdd(true);
          }}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
        <Modal.Header>
          <Modal.Title>Agregar Educación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' label="Nombre">
            <Form.Control ref={nameRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Escuela">
            <Form.Control ref={schoolRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Año de Inicio">
            <Form.Control type="number" ref={yearStartRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Año de Fin">
            <Form.Control type="number" ref={yearEndRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Estado">
            <Form.Control ref={stateRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="País">
            <Form.Control ref={countryRef} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => {
            setShowModalAdd(false);
            setShowModalEducation(true);
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

export default ModalEducations;
