import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function ContentSignUp({ setType }) {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        console.log(response);

        if (response.status === 200) {
          sessionStorage.setItem('logged', true);
          sessionStorage.setItem('email', formDataObject.email);
          location.reload();
        }
      }
      catch (error) {
        console.log(error);
        console.log(error.response);
        switch (error.response.status) {
          case 404:
            setError('Usuario no encontrado');
            break;
          case 401:
            setError('Contraseña incorrecta');
            break;
          default:
            setError('Error desconocido');
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
    <div>
      <h1 className="mb-5">Crea tu cuenta</h1>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel label="Nombre completo" className="mb-3">
            <Form.Control placeholder="Name" name='name' required />
          </FloatingLabel>

          <FloatingLabel label="Telefono" className="mb-3">
            <Form.Control placeholder="Phone" name='phone' required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingEmail" label="Correo electronico" className="mb-3">
            <Form.Control type="email" placeholder="name@example.com" defaultValue='' name='email' required />
          </FloatingLabel>

          <FloatingLabel label="Contraseña" className="mb-5">
            <Form.Control placeholder="Password" name='password' required />
          </FloatingLabel>

          {error === '' ?
            null
            :
            <p className='text-danger'>{error}</p>
          }

          <Button className='mt-4 mb-5 d-flex align-items-center gap-2 w-100 justify-content-center' variant="primary" type="submit">
            <IoLogIn /> Crear cuenta
          </Button>

          <p className='text-center'>¿Ya tienes cuenta? <b onClick={() => { setType('login') }}>Inicia sesión</b></p>

          {loading ?
            <div className="Loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            :
            null
          }
        </Form>
      </div>
    </div>
  );
}

export default ContentSignUp;