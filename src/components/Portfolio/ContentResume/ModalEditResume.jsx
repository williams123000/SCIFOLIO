import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

function ModalEditResume({ show, onHide }) {
  const [validated, setValidated] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    const savedEducationList = JSON.parse(localStorage.getItem('educationList')) || [];
    const savedExperienceList = JSON.parse(localStorage.getItem('experienceList')) || [];
    const savedSkillsList = JSON.parse(localStorage.getItem('skillsList')) || [];

    setEducationList(savedEducationList);
    setExperienceList(savedExperienceList);
    setSkillsList(savedSkillsList);
  }, [show]);

  const handleAddEducation = () => {
    setEducationList([...educationList, { nombre: '', pais: '', escuela: '', estado: '', fechaInicio: '', fechaFin: '' }]);
  };

  const handleAddExperience = () => {
    setExperienceList([...experienceList, { compañia: '', fechaInicio: '', fechaFin: '', puesto: '' }]);
  };

  const handleAddSkills = () => {
    setSkillsList([...skillsList, { nombre: '', nivel: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedEducation = [...educationList];
    updatedEducation[index][field] = value;
    setEducationList(updatedEducation);
  };

  const handleChangeExperience = (index, field, value) => {
    const updatedExperience = [...experienceList];
    updatedExperience[index][field] = value;
    setExperienceList(updatedExperience);
  };

  const handleChangeSkills = (index, field, value) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index][field] = value;
    setSkillsList(updatedSkills);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = educationList.filter((_, i) => i !== index);
    setEducationList(updatedEducation);
    localStorage.setItem('educationList', JSON.stringify(updatedEducation));
  };

  const handleDeleteExperience = (index) => {
    const updatedExperience = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedExperience);
    localStorage.setItem('experienceList', JSON.stringify(updatedExperience));
  };

  const handleDeleteSkills = (index) => {
    const updatedSkills = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedSkills);
    localStorage.setItem('skillsList', JSON.stringify(updatedSkills));
  };

  const handleSubmit = async (event) => {
    Swal.fire({
      title: 'Guardando cambios',
      html: 'Por favor, espere un momento',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();

      const formattedEducationList = educationList.map(edu => ({
        nombre: edu.nombre.trim() || ' ',
        pais: edu.pais.trim() || ' ',
        escuela: edu.escuela.trim() || ' ',
        estado: edu.estado.trim() || ' ',
        fechaInicio: edu.fechaInicio.trim() || ' ',
        fechaFin: edu.fechaFin.trim() || ' ',
      }));

      const formattedExperienceList = experienceList.map(exp => ({
        compañia: exp.compañia.trim() || ' ',
        fechaInicio: exp.fechaInicio.trim() || ' ',
        fechaFin: exp.fechaFin.trim() || ' ',
        puesto: exp.puesto.trim() || ' ',
      }));

      const formattedSkillsList = skillsList.map(skill => ({
        nombre: skill.nombre.trim() || ' ',
        nivel: skill.nivel.trim() || ' ',
      }));

      const formDataObject = {
        uid : sessionStorage.getItem('uid'),
        education: formattedEducationList,
        experience: formattedExperienceList,
        skills: formattedSkillsList
      };

      console.log(formDataObject);

      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_POST = import.meta.env.VITE_API_UPLOADINFORESUME;
        const URL_Petition = URL + URL_POST;
        const response = await axios.post(URL_Petition, formDataObject);
        
        console.log('Respuesta:', response.data);

        localStorage.setItem('educationList', JSON.stringify(formattedEducationList));
        localStorage.setItem('experienceList', JSON.stringify(formattedExperienceList));
        localStorage.setItem('skillsList', JSON.stringify(formattedSkillsList));

        Swal.fire('Éxito', 'Los cambios se guardaron correctamente', 'success');
      } catch (error) {
        console.log(error);
        Swal.fire('Error', 'Hubo un problema al guardar los cambios', 'error');
      }
    }

    setValidated(true);
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tu Resumen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {educationList.map((education, index) => (
              <Form.Group key={index} className="mb-3" controlId={`education-${index}`}>
                <Form.Label>Educación {index + 1}</Form.Label>
                <Button variant="primary d-flex align-items-center gap-2" onClick={() => handleDeleteEducation(index)} className="mb-2">
                  <FaTrash /> Eliminar
                </Button>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Nombre"
                  value={education.nombre}
                  onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="País"
                  value={education.pais}
                  onChange={(e) => handleChange(index, 'pais', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Escuela"
                  value={education.escuela}
                  onChange={(e) => handleChange(index, 'escuela', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Estado"
                  value={education.estado}
                  onChange={(e) => handleChange(index, 'estado', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Fecha de inicio"
                  value={education.fechaInicio}
                  onChange={(e) => handleChange(index, 'fechaInicio', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Fecha de fin"
                  value={education.fechaFin}
                  onChange={(e) => handleChange(index, 'fechaFin', e.target.value)}
                />
              </Form.Group>
            ))}
            <div className="d-flex justify-content-center">
              <Button variant="outline-primary" onClick={handleAddEducation}>
                <FaPlus /> Agregar otra educación
              </Button>
            </div>

            {experienceList.map((experience, index) => (
              <Form.Group key={index} className="mb-3 mt-3" controlId={`experience-${index}`}>
                <Form.Label>Experiencia {index + 1}</Form.Label>
                <Button variant="primary d-flex align-items-center gap-2" onClick={() => handleDeleteExperience(index)} className="mb-2">
                  <FaTrash /> Eliminar
                </Button>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Compañia"
                  value={experience.compañia}
                  onChange={(e) => handleChangeExperience(index, 'compañia', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Fecha de inicio"
                  value={experience.fechaInicio}
                  onChange={(e) => handleChangeExperience(index, 'fechaInicio', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Fecha de fin"
                  value={experience.fechaFin}
                  onChange={(e) => handleChangeExperience(index, 'fechaFin', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Puesto"
                  value={experience.puesto}
                  onChange={(e) => handleChangeExperience(index, 'puesto', e.target.value)}
                />
              </Form.Group>
            ))}
            <div className="d-flex justify-content-center">
              <Button variant="outline-primary" onClick={handleAddExperience}>
                <FaPlus /> Agregar otra experiencia
              </Button>
            </div>

            {skillsList.map((skill, index) => (
              <Form.Group key={index} className="mb-3 mt-3" controlId={`skills-${index}`}>
                <Form.Label>Habilidad {index + 1}</Form.Label>
                <Button variant="primary d-flex align-items-center gap-2" onClick={() => handleDeleteSkills(index)} className="mb-2">
                  <FaTrash /> Eliminar
                </Button>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Nombre"
                  value={skill.nombre}
                  onChange={(e) => handleChangeSkills(index, 'nombre', e.target.value)}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Nivel"
                  value={skill.nivel}
                  onChange={(e) => handleChangeSkills(index, 'nivel', e.target.value)}
                />
              </Form.Group>
            ))}
            <div className="d-flex justify-content-center">
              <Button variant="outline-primary" onClick={handleAddSkills}>
                <FaPlus /> Agregar otra habilidad
              </Button>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="primary">
                Guardar cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditResume;
