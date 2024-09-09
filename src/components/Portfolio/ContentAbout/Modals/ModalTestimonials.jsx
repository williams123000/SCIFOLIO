import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function ModalTestimonials({ showModal, setShowModal, data }) {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState(data);
  const [showModalAdd, setShowModalAdd] = useState(false);
  
  const nameRef = useRef(null);
  const textRef = useRef(null);
  const genderRef = useRef(null);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_DELETE = import.meta.env.VITE_API_DELETETESTIMONIAL;
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
    const text = textRef.current.value;
    const gender = genderRef.current.value;

    try {
      const URL = import.meta.env.VITE_URL_API;
      const URL_PUT = import.meta.env.VITE_API_UPLOADINFOABOUT;
      const URL_Petition = URL + URL_PUT;
      await axios.post(URL_Petition, {
        uid: sessionStorage.getItem('uid'),
        testimonials: [
          {
            Nombre: name,
            Descripcion: text,
            Imagen: gender
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
      <Modal show={showModal} size='lg' onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Editar Testimonios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Texto</th>
                <th className="px-4 py-2 text-left">Género</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{testimonial.Name}</td>
                  <td className="px-4 py-2 border-t">{testimonial.Text}</td>
                  <td className="px-4 py-2 border-t">{testimonial.Gender}</td>
                  <td className="px-4 py-2 border-t">
                    <Button
                      onClick={() => handleDelete(testimonial.Name)}
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
          <Button variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
        <Modal.Header>
          <Modal.Title>Agregar Testimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' label="Nombre">
            <Form.Control ref={nameRef} />
          </FloatingLabel>

          <FloatingLabel label="Texto" className='mb-3'>
            <Form.Control as="textarea" ref={textRef} />
          </FloatingLabel>

          <FloatingLabel className='mb-3' controlId="floatingSelect" label="Género">
            <Form.Select aria-label="Floating label select example" ref={genderRef}>
              <option>Selecciona una opción</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </Form.Select>
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

export default ModalTestimonials;
