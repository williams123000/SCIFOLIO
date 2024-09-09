import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { GrPowerReset } from "react-icons/gr";
import axios from 'axios';
import { GoAlertFill } from "react-icons/go";
import Swal from 'sweetalert2';

function ModalRecoveryPassword({ show, onHide }) {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      const formData = new FormData(form);
      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);

      const URL = import.meta.env.VITE_URL_API;
      const URL_POST = import.meta.env.VITE_API_RECOVERYPASSWORD;
      const URL_Petition = URL + URL_POST;

      try {
        // Muestra el Swal en modo de carga mientras se procesa la solicitud
        Swal.fire({
          title: 'Enviando...',
          text: 'Por favor espera mientras procesamos tu solicitud.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await axios.post(URL_Petition, formDataObject);

        // Si la petición fue exitosa, ocultar el modal y mostrar el Swal de éxito
        onHide();
        Swal.fire({
          title: 'Correo enviado',
          text: 'Revisa tu bandeja de entrada para recuperar tu contraseña.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: 'Aceptar'
        });

      } catch (error) {
        console.log(error);

        switch (error.response?.data?.error) {
          case 'auth/user-not-found':
            Swal.fire('Error', 'Usuario no encontrado', 'error');
            break;
          default:
            Swal.fire('Error', 'Error desconocido, intente más tarde', 'error');
            break;
        }
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Recuperación de contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Correo electronico"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" defaultValue='' name='email' required />
            </FloatingLabel>

            <p className='text-center' style={{ color: "gray" }}><small>Se te enviará un link de recuperación de tu cuenta</small></p>

            {error !== '' && (
              <div className="w-100 p-4">
                <div className="w-100 p-3 d-flex align-items-center justify-content-center rounded gap-2" style={{ background: "#361d12", border: "1px solid #75452b", color: "#cba754" }}>
                  <GoAlertFill /> <p className="mb-0">{error}</p>
                </div>
              </div>
            )}

            <div className='w-100 d-flex justify-content-center'>
              <Button variant="primary d-flex align-items-center gap-2" type='submit'>
                <GrPowerReset /> Recuperar
              </Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalRecoveryPassword;
