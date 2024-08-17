import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

function Login() {
  const [inputType, setInputType] = useState('password');
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState('');
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
            setAlert('Usuario no encontrado');
            break;
          case 401:
            setAlert('Contraseña incorrecta');
            break;
          default:
            setAlert('Error desconocido');
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
    <div className="Home p-5 d-flex justify-content-center">
      <div className="Login w-50 p-5">
        <h1>SciFolio</h1>
        <hr className="Background_Yellow" />

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
            <p onClick={() => {
              console.log('Forgot password');
            }}>¿Olvidaste tu contraseña?</p>

            {alert === '' ?
              null
              :
              <p className='text-danger'>{alert}</p>
            }

            <Button className='mt-5' variant="primary" type="submit">
              Iniciar sesión
            </Button>
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

    </div>



  )
}

export default Login;