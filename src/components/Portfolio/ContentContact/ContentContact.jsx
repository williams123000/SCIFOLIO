import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ContentContact() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div className='h-100' style={{ position: 'relative', overflowY: 'scroll' }}>
      <h1>Contacto</h1>
      <hr className="Background_Yellow" />
      <div className='Map w-100 mb-5'>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>

          </Marker>
        </MapContainer>
      </div>
      <h3>Formulario de contacto</h3>
      <div className='p-1'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Nombre completo"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Row>
          <Row className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Correo electrónico"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Row>


          <Row className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
              <Form.Control
                as="textarea"
                placeholder="Comentarios"
                style={{ height: '100px' }}
              />
            </FloatingLabel>

          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </div>
  )
}

export default ContentContact;