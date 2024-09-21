import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ModalAddress({ show, setShow }) {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            
            // Extraer datos del formulario
            var formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const URL = import.meta.env.VITE_URL_API;
                const URL_GEOCODE = import.meta.env.VITE_API_GEOCODE; // Endpoint para convertir dirección en coordenadas
                const URL_Petition = URL + URL_GEOCODE;
                
                // Enviar la dirección al backend para obtener coordenadas
                const response = await axios.post(URL_Petition, {
                    uid: sessionStorage.getItem('uid'),
                    street: data.street,
                    number: data.number,
                    neighborhood: data.neighborhood,
                    city: data.city
                });
                
                console.log(response.data);
                
                setShow(false); // Cerrar el modal después de obtener las coordenadas
                navigate(0); // Recargar la página
            } catch (error) {
                console.log(error);
            }
        }

        setValidated(true);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Ingrese su dirección</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingStreet" label="Calle" className="mb-3">
                            <Form.Control type="text" name="street" placeholder="Calle" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingNumber" label="Número" className="mb-3">
                            <Form.Control type="text" name="number" placeholder="Número" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingNeighborhood" label="Colonia" className="mb-3">
                            <Form.Control type="text" name="neighborhood" placeholder="Colonia" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingCity" label="Ciudad" className="mb-3">
                            <Form.Control type="text" name="city" placeholder="Ciudad" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Button type="submit">Obtener Coordenadas</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalAddress;
