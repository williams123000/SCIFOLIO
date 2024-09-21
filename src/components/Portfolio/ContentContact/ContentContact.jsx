import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdModeEdit } from 'react-icons/md';

import ModalAddress from './Modals/ModalAddress'; // Asegúrate de que el nombre y ruta sean correctos

function ContentContact({ isDesktop, visited, dataVisited }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [validated, setValidated] = useState(false);

  const [showModalAddress, setShowModalAddress] = useState(false); // Cambié "Adress" a "Address"

  useEffect(() => {
    async function getData() {
      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_CONTACT
        const UID = visited ? dataVisited : sessionStorage.getItem('uid');
        const URL_Petition = URL + URL_GET + '/' + UID;
        const response = await axios.get(URL_Petition);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [])

  if (loading) {
    return <h1>Cargando...</h1>
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      var formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
      const URL = import.meta.env.VITE_URL_API;
      const URL_POST = import.meta.env.VITE_API_FORMCONTACT;
      const URL_Petition = URL + URL_POST;
      var emailClient = document.getElementById('emailProfile');
      var emailValue = emailClient.textContent;
      
      var msg = `
Hola,

${data.name} está interesado en conectar contigo.

Información de contacto:
Correo: ${data.email}

Mensaje:
"${data.message}"

Esperamos que puedan ponerse en contacto pronto.

Saludos,
SciFolio
`;
      const subjet = 'Contacto desde SciFolio';
      try {
        const response = await axios.post(URL_Petition, {
          uid : sessionStorage.getItem('uid'),
          emailTo: emailValue,
          message: msg,
          subjet: subjet
       });
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Tu mensaje ha sido enviado correctamente'
        });
      } catch (error) {
        console.log(error);
      }

      
    }

    setValidated(true);
  };


  return (
    <>
      <div className='h-100 w-100' style={{ position: 'relative', overflowY: 'scroll' }}>
        <div className="d-flex gap-2 align-items-center">
          {visited ? null : <h4 className="d-flex align-items-center" onClick={() => setShowModalAddress(true)}><MdModeEdit /></h4>}
          <h1>Contacto</h1>
        </div>
        <hr className="Background_Yellow" />

        <div className='Map w-100 mb-5'>
          <MapContainer center={[data.InfoLocation.AxisX, data.InfoLocation.AxisY]} zoom={17} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data.InfoLocation.AxisX, data.InfoLocation.AxisY]}>

            </Marker>
          </MapContainer>
        </div>
        <h3>Formulario de contacto</h3>
        <div className='p-1 w-100'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre completo"
                className="mb-3"
              >
                <Form.Control type="text" name='name' placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Correo electrónico"
                className="mb-3"
              >
                <Form.Control type="email" name='email'  placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
                <Form.Control
                  as="textarea"
                  placeholder="Comentarios"
                  style={{ height: '100px' }}
                  name='message'
                />
              </FloatingLabel>

            </Form.Group>
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </div>
      {/* Asegúrate de que el nombre del componente modal sea correcto */}
      <ModalAddress show={showModalAddress} setShow={setShowModalAddress} /> 
    </>
  )
}

export default ContentContact;
