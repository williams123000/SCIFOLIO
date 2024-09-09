import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Lottie from "lottie-react";
import animationLoading from "../../assets/animations/loading.json";
import { GoAlertFill } from "react-icons/go";
import ModalRecoveryPassword from "./ModalRecoveryPassword";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function ContentLogin({ setType }) {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState('password');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalRecoverPassword, setModalRecoveryPassword] = useState(false);

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
      setLoading(true);

      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_POST = import.meta.env.VITE_API_LOGIN;
        const URL_Petition = URL + URL_POST;
        const response = await axios.post(URL_Petition, formDataObject);
        console.log(response.data);
        sessionStorage.setItem('logged', true);
        sessionStorage.setItem('email', formDataObject.email);
        sessionStorage.setItem('uid', response.data.uid);
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        });
        navigate('/');
        
      }
      catch (error) {
        console.log(error.response.data);
        switch (error.response.data.error) {
          case "auth/invalid-credential":
            Swal.fire('Errror', 'Credenciales incorrectas', 'error');
            /*setError('Email o contraseña incorrectos');*/
            break;
          case "auth/too-many-requests":
            Swal|fire('Error', 'Usuario bloqueado temporalmente, restablezca su contraseña', 'error');
            /*setError('Usuario bloqueado temporalmente, restablezca su contraseña');*/
            break;
          default:
            Swal.fire('Error', 'Error desconocido, intente más tarde', 'error');
            /*setError('Error desconocido, intente más tarde');*/
            break;
        }
      }
      finally {
        setLoading(false);
      }
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      <div>
        <h1 className="mb-5">Inicia sesión</h1>

        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Correo electronico"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" defaultValue='' name='email' required />
            </FloatingLabel>

            <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
              <InputGroup>
                <FloatingLabel label="Contraseña">
                  <Form.Control type={inputType} placeholder="Password" name='password' required />
                </FloatingLabel>
                <Button
                  onClick={() => {
                    setInputType(inputType === 'password' ? 'text' : 'password');
                  }}
                  variant="outline-secondary"
                  id="button-addon2">
                  {
                    inputType === 'password' ? <FaEye /> : <FaEyeSlash />
                  }
                </Button>

              </InputGroup>
            </Form.Group>
            <p className='mb-4 text-center text-lg-start' onClick={() => {
              setModalRecoveryPassword(true);
            }}>¿Olvidaste tu contraseña?</p>

            {error !== '' && (
              <div className="w-100 p-4">
                <div className="w-100 p-3 d-flex align-items-center justify-content-center rounded gap-2" style={{ background: "#361d12", border: "1px solid #75452b", color: "#cba754" }}>
                  <GoAlertFill /> <p className="mb-0">{error}</p>
                </div>
              </div>
            )}

            <Button className='mt-4 mb-5 d-flex align-items-center gap-2 w-100 justify-content-center' variant="primary" type="submit">
              <IoLogIn /> Iniciar sesión
            </Button>
            <p className='text-center'>¿No tienes cuenta? <b onClick={() => { setType('signUp') }}>Crea tu cuenta</b></p>


          </Form>
        </div>
      </div>

      <ModalRecoveryPassword show={modalRecoverPassword} onHide={() => setModalRecoveryPassword(false)} />
      

      {loading && (
        <div className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed fixed-top' style={{ background: "#533e2a70" }}>
          <Lottie animationData={animationLoading} style={{ width: '30%', height: '30%' }} />
        </div>
      )}
    </>

  );
}

export default ContentLogin;