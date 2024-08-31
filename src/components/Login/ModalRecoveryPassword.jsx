import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { GrPowerReset } from "react-icons/gr";
import axios from 'axios';
import { GoAlertFill } from "react-icons/go";
import { Toaster, toast } from 'alert';

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

      console.log(URL_Petition);
      const makeRequest = async () => {
        const promise = async () => {
          try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos iniciales
            const response = await axios.post(URL_Petition, formDataObject);
            
            // Espera 2 segundos adicionales después de la petición exitosa
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Muestra el alert
            onHide();
            
            return response; // Resolvemos la promesa
          } catch (error) {
            console.log(error);
            switch (error.response?.data?.error) {
              case 'auth/user-not-found':
                setError('Usuario no encontrado');
                break;
              // Puedes agregar más casos aquí según sea necesario
            }
            throw error; // Si hay un error, lo lanzamos para que el toast lo capture
          }
        };
      
        toast.promise(promise, {
          loading: 'Enviando ...',
          success: 'Correo enviado',
          error: 'Error al enviar el correo',
        });
      };
      
      // Llama a esta función cuando quieras hacer la petición
      makeRequest();
    }
    setValidated(true);
  }



  return (
    <>

      <Modal show={show} onHide={onHide} centered>
        <div>
          <Toaster theme='dark' position='top-center' options={{
            style: {
              background: '#333',
              color: '#fff',
            },
            className: "xyz"
          }} />
        </div>
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

            <p className='text-center' style={{ color: "gray" }}><small>Se te enviara un link de recuperación de tu cuenta</small></p>

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

  )
}

export default ModalRecoveryPassword;