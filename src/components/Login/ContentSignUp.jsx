import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Lottie from "lottie-react";
import animationLoading from "../../assets/animations/loading.json";
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function ContentSignUp({ setType }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState('');

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';

    if (digits.length > 0) formatted += '+' + digits.substring(0, 2);
    if (digits.length > 2) formatted += ' (' + digits.substring(2, 5);
    if (digits.length > 5) formatted += ') ' + digits.substring(5, 8);
    if (digits.length > 8) formatted += ' ' + digits.substring(8, 12);

    return formatted;
  };

  const handleChange = (event) => {
    const input = event.target.value;
    const digits = input.replace(/\D/g, '');

    if (digits.length <= 12) {
      setPhone(formatPhoneNumber(digits));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && phone.length > 0) {
      event.preventDefault();
      const digits = phone.replace(/\D/g, '').slice(0, -1);
      setPhone(formatPhoneNumber(digits));
    }
  };

  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsValid(newPassword.length >= 8 || newPassword.length === 0);
  };

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
        const URL_POST = import.meta.env.VITE_API_REGISTER;
        const URL_Petition = URL + URL_POST;
        const response = await axios.post(URL_Petition, formDataObject);
        console.log(response);
        const uid = response.data.uid;
        sessionStorage.setItem('uid', uid);
        navigate('/register');


      } catch (error) {
        console.error(error);
        switch (error.response.data.error) {
          case 'auth/email-already-in-use':
            Swal.fire('Error', 'El correo ya está registrado', 'error');
            /*setError('El correo ya está registrado');*/
            break;
          default:
            Swal.fire('Error', 'Error desconocido, intente más tarde', 'error');
            /*setError('Error desconocido, intente más tarde');*/
            break;
        }
      } finally {
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
        <h1 className="mb-5">Crea tu cuenta</h1>
        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel label="Nombre completo" className="mb-3">
              <Form.Control placeholder="Name" name='name' required />
            </FloatingLabel>
            <FloatingLabel label="Teléfono" className="mb-3">
              <Form.Control
                placeholder="Teléfono"
                name='phone'
                required
                value={phone}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                inputMode="tel"
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingEmail" label="Correo electronico" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" defaultValue='' name='email' required />
            </FloatingLabel>

            <FloatingLabel label="Contraseña" className="mb-5">
              <Form.Control
                type="text"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={handleChangePassword}
                isInvalid={!isValid}
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 8 caracteres.
              </Form.Control.Feedback>
            </FloatingLabel>

            {error !== '' && (
              <div className="w-100 p-4">
                <div className="w-100 p-3 d-flex align-items-center justify-content-center rounded gap-2" style={{ background: "#361d12", border: "1px solid #75452b", color: "#cba754" }}>
                  <GoAlertFill /> <p className="mb-0">{error}</p>
                </div>
              </div>
            )}

            <Button className='mt-4 mb-5 d-flex align-items-center gap-2 w-100 justify-content-center' variant="primary" type="submit">
              <IoLogIn /> Crear cuenta
            </Button>

            <p className='text-center'>¿Ya tienes cuenta? <b onClick={() => { setType('login') }}>Inicia sesión</b></p>


          </Form>
        </div>
      </div>

      {loading && (
        <div className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed fixed-top' style={{ background: "#533e2a70" }}>
          <Lottie animationData={animationLoading} style={{ width: '30%', height: '30%' }} />
        </div>
      )}
    </>
  );
}

export default ContentSignUp;