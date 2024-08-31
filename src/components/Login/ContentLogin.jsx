import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function ContentLogin( {setType}) {
    const [inputType, setInputType] = useState('password');
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
                    <p className='mb-0' onClick={() => {
                        alert('Forgot password');
                    }}>¿Olvidaste tu contraseña?</p>

                    {error === '' ?
                        null
                        :
                        <p className='text-danger'>{error}</p>
                    }

                    <Button className='mt-4 mb-5 d-flex align-items-center gap-2 w-100 justify-content-center' variant="primary" type="submit">
                        <IoLogIn /> Iniciar sesión
                    </Button>
                    <p className='text-center'>¿No tienes cuenta? <b onClick={() => {setType('signUp')}}>Crea tu cuenta</b></p>

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

export default ContentLogin;