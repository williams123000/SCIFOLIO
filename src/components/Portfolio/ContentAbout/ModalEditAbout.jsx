import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ModalEditAbout({ show, onHide }) {
  const [validated, setValidated] = useState(false);
  const [hobbiesList, setHobbiesList] = useState([{ Nombre: '', Descripcion: '', Categoria: '' }]);
  const [testimonialList, setTestimonialList] = useState([{ Nombre: '', Descripcion: '', Imagen: '' }]);
  const [resume, setResume] = useState('');
  const [certificates, setCertificates] = useState({
    certificado1: '',
    certificado2: '',
    certificado3: '',
    certificado4: ''
  });

  // Cargar los datos guardados en localStorage al montar el componente
  useEffect(() => {
    const storedResume = localStorage.getItem('resume');
    const storedCertificates = JSON.parse(localStorage.getItem('certificates'));
    const storedHobbies = JSON.parse(localStorage.getItem('hobbies'));
    const storedTestimonials = JSON.parse(localStorage.getItem('testimonials'));

    if (storedResume) setResume(storedResume);
    if (storedCertificates) setCertificates(storedCertificates);
    if (storedHobbies) setHobbiesList(storedHobbies);
    if (storedTestimonials) setTestimonialList(storedTestimonials);
  }, [show]); // Ejecuta esto cuando el modal se muestre

  const handleAddHobbies = () => {
    setHobbiesList([...hobbiesList, { Nombre: '', Descripcion: '', Categoria: '' }]);
  };

  const handleAddTestimonial = () => {
    setTestimonialList([...testimonialList, { Nombre: '', Descripcion: '', Imagen: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedHobbies = [...hobbiesList];
    updatedHobbies[index][field] = value;
    setHobbiesList(updatedHobbies);
  };

  const handleChangeTestimonial = (index, field, value) => {
    const updatedTestimonial = [...testimonialList];
    updatedTestimonial[index][field] = value;
    setTestimonialList(updatedTestimonial);
  };

  const handleDeleteHobby = (index) => {
    const updatedHobbiesList = hobbiesList.filter((_, i) => i !== index);
    setHobbiesList(updatedHobbiesList);
    localStorage.setItem('hobbies', JSON.stringify(updatedHobbiesList));
  };

  const handleDeleteTestimonial = (index) => {
    const updatedTestimonialList = testimonialList.filter((_, i) => i !== index);
    setTestimonialList(updatedTestimonialList);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonialList));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const finalResume = resume.trim() === '' ? ' ' : resume;
      const finalCertificates = {
        certificado1: certificates.certificado1.trim() === '' ? ' ' : certificates.certificado1,
        certificado2: certificates.certificado2.trim() === '' ? ' ' : certificates.certificado2,
        certificado3: certificates.certificado3.trim() === '' ? ' ' : certificates.certificado3,
        certificado4: certificates.certificado4.trim() === '' ? ' ' : certificates.certificado4
      };

      const formData = {
        uid: sessionStorage.getItem('uid'),
        resume: finalResume,
        certificates: finalCertificates,
        hobbies: hobbiesList.reduce((acc, hobby, index) => {
          acc[index] = {
            Descripcion: hobby.Descripcion,
            Categoria: hobby.Categoria
          };
          return acc;
        }, {}),
        testimonials: testimonialList.reduce((acc, testimonial, index) => {
          acc[index] = {
            Nombre: testimonial.Nombre,
            Descripcion: testimonial.Descripcion,
            Imagen: testimonial.Imagen
          };
          return acc;
        }, {}),
      };

      // Guardar los datos en localStorage
      localStorage.setItem('resume', resume);
      localStorage.setItem('certificates', JSON.stringify(certificates));
      localStorage.setItem('hobbies', JSON.stringify(hobbiesList));
      localStorage.setItem('testimonials', JSON.stringify(testimonialList));

      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_POST = import.meta.env.VITE_API_UPLOADINFOABOUT;
        const URL_Petition = `${URL}${URL_POST}`;

        const response = await axios.post(URL_Petition, formData);
        console.log('Respuesta del servidor:', response.data);
        Swal.fire('Éxito', 'Los cambios se guardaron correctamente', 'success');
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al guardar los cambios', 'error');
      }
    }

    setValidated(true);
    // Cierra el modal
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Editar Acerca de</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '800px', overflowY: 'auto' }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Resumen */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Escríbeme un breve resumen de ti</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="resumen"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </Form.Group>

            {/* Hobbies */}
            {hobbiesList.map((hobbies, index) => (
              <Form.Group key={index} className="mb-3" controlId={`hobbies-${index}`}>
                <Form.Label>Pasatiempo {index + 1}</Form.Label>

                <Button variant="primary d-flex align-items-center gap-2" onClick={() => handleDeleteHobby(index)} className="mb-2">
                  <FaTrash /> Eliminar
                </Button>

                <Form.Group className="mb-3" controlId={`formCategory-${index}`}>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    name={`hobbies-${index}-categoria`}
                    value={hobbies.Categoria}
                    onChange={(e) => handleChange(index, 'Categoria', e.target.value)}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Lectura">Lectura</option>
                    <option value="Pintura">Pintura</option>
                    <option value="Cocina">Cocina</option>
                    <option value="Fotografía">Fotografía</option>
                    <option value="Música">Música</option>
                  </Form.Select>
                </Form.Group>

                <Form.Control
                  className="mb-2"
                  type="text"
                  name={`hobbies-${index}-descripcion`}
                  placeholder="Descripción"
                  value={hobbies.Descripcion}
                  onChange={(e) => handleChange(index, 'Descripcion', e.target.value)}
                />
              </Form.Group>
            ))}

            <div className="d-flex justify-content-center">
              <Button onClick={handleAddHobbies}>
                <FaPlus /> Añadir Pasatiempo
              </Button>
            </div>

            {/* Certificados */}
            <Form.Group className="mb-3">
              <Form.Label>Certificados</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Certificado 1"
                name="certificado-1"
                value={certificates.certificado1}
                onChange={(e) => setCertificates({ ...certificates, certificado1: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Certificado 2"
                name="certificado-2"
                value={certificates.certificado2}
                onChange={(e) => setCertificates({ ...certificates, certificado2: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Certificado 3"
                name="certificado-3"
                value={certificates.certificado3}
                onChange={(e) => setCertificates({ ...certificates, certificado3: e.target.value })}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Certificado 4"
                name="certificado-4"
                value={certificates.certificado4}
                onChange={(e) => setCertificates({ ...certificates, certificado4: e.target.value })}
              />
            </Form.Group>

            {/* Testimonios */}
            {testimonialList.map((testimonial, index) => (
              <Form.Group key={index} className="mb-3" controlId={`testimonial-${index}`}>
                <Form.Label>Testimonio {index + 1}</Form.Label>

                <Button variant="primary d-flex align-items-center gap-2" onClick={() => handleDeleteTestimonial(index)} className="mb-2">
                  <FaTrash /> Eliminar
                </Button>

                <Form.Control
                  className="mb-2"
                  type="text"
                  name={`testimonial-${index}-nombre`}
                  placeholder="Nombre"
                  value={testimonial.Nombre}
                  onChange={(e) => handleChangeTestimonial(index, 'Nombre', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  name={`testimonial-${index}-descripcion`}
                  placeholder="Descripción"
                  value={testimonial.Descripcion}
                  onChange={(e) => handleChangeTestimonial(index, 'Descripcion', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  name={`testimonial-${index}-imagen`}
                  placeholder="Imagen (URL)"
                  value={testimonial.Imagen}
                  onChange={(e) => handleChangeTestimonial(index, 'Imagen', e.target.value)}
                />
              </Form.Group>
            ))}

            <div className="d-flex justify-content-center">
              <Button onClick={handleAddTestimonial}>
                <FaPlus /> Añadir Testimonio
              </Button>
            </div>

            <Modal.Footer className='mt-3'>
              <Button variant="primary" type="submit">
                <FaSave /> Guardar Cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditAbout;
