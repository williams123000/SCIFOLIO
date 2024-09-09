import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function ModalSkills({ showModalSkills, setShowModalSkills, data }) {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(data);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const nameRef = useRef(null);
  const valueRef = useRef(null);

  const handleDelete = async (id) => {
    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_DELETE = import.meta.env.VITE_API_DELETESKILL;
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
    const value = valueRef.current.value;

    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_PUT = import.meta.env.VITE_API_UPLOADINFORESUME;
      const URL_Petition = URL + URL_PUT;
      await axios.post(URL_Petition, {
        uid: sessionStorage.getItem('uid'),
        skills: [
          {
            nombre: name,
            nivel: value
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
      <Modal show={showModalSkills} size='lg' onHide={() => setShowModalSkills(false)} centered>
        <Modal.Header>
          <Modal.Title>Editar Habilidades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Nivel</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{skill.Name}</td>
                  <td className="px-4 py-2 border-t">{skill.Value}%</td>
                  <td className="px-4 py-2 border-t">
                    <Button
                      onClick={() => handleDelete(skill.Name)}
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
          <Button variant="outline-primary" onClick={() => setShowModalSkills(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModalSkills(false);
            setShowModalAdd(true);
          }}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
        <Modal.Header>
          <Modal.Title>Agregar Habilidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' label="Nombre de la Habilidad">
            <Form.Control ref={nameRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' label="Valor (0-100)">
            <Form.Control type="number" ref={valueRef} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => {
            setShowModalAdd(false);
            setShowModalSkills(true);
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

export default ModalSkills;
