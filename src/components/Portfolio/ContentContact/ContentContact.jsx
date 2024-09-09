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

function ContentContact() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_CONTACT;
        const URL_Petition = URL + URL_GET + '/' + 'richar@email.com';
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div className='h-100 w-100' style={{ position: 'relative', overflowY: 'scroll' }}>
      <h1>Contacto</h1>
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
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Correo electrónico"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>


          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
              <Form.Control
                as="textarea"
                placeholder="Comentarios"
                style={{ height: '100px' }}
              />
            </FloatingLabel>

          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </div>
  )
}

export default ContentContact;