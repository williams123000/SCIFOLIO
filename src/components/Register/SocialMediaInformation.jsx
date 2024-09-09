import { Form, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { GrFormPrevious } from "react-icons/gr";
import Swal from 'sweetalert2';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationLoading from '../../assets/animations/loading.json';
import { useNavigate } from 'react-router-dom';


function SocialMediaInformation({ setSection }) {
  const navigate = useNavigate();
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  function validateURL (url, type) {
    switch (type) {
      case 'facebook':{
        const regex = /^https:\/\/www\.facebook\.com\/.+$/i;
        return regex.test(url);
      }
      case 'x':{
        const regex = /^https:\/\/x\.com\/.+$/i;
        return regex.test(url);
      }
      case 'instagram':{
        const regex = /^https:\/\/www\.instagram\.com\/.+$/i;
        return regex.test(url);
      }
      case 'linkedin':{
        const regex = /^https:\/\/www\.linkedin\.com\/.+$/i;
        return regex.test(url);
      }
      

    }
  }
  const handleSubmit = async () => {
    if (facebook.length > 0 && !validateURL(facebook, 'facebook')){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El enlace de Facebook no es válido'
      });
      return;
    }
    if (instagram.length > 0 && !validateURL(instagram, 'instagram')){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El enlace de Instagram no es válido'
      });

      return;
    }
    if (twitter.length > 0 && !validateURL(twitter, 'x')){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El enlace de Twitter no es válido'
      });
      return;
    }
    if (linkedin.length > 0 && !validateURL(linkedin, 'linkedin')){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El enlace de Linkedin no es válido'
      });

      return;
    }
    
    try {
      setLoading(true);
      const data = {
        uid : sessionStorage.getItem('uid'),
        socialMedia: {
          facebook: facebook,
          instagram: instagram,
          twitter: twitter,
          linkedin: linkedin,
          url: url
        },
        birthday: localStorage.getItem('birthdayFormatted'),
        imageProfile : localStorage.getItem('profileImage'),
        profession: localStorage.getItem('profession')
      }

      console.log(data);
      const URL = import.meta.env.VITE_URL_API + import.meta.env.VITE_API_UPLOADINFOPERSONAL;
      await axios.post(URL, data);

      localStorage.removeItem('birthdayFormatted');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('profession');
      localStorage.removeItem('birthday');
      localStorage.removeItem('imagesProfile');
      sessionStorage.setItem('logged', true);
      
      setLoading(false);
      Swal.fire({
        title: 'Registro exitoso',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      });

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='d-flex w-100 h-100 flex-column justify-content-center align-items-center gap-3'>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          <FaFacebook style={{ fontSize: '2rem', height: '38px' }} />
          <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
            <FloatingLabel label="Facebook" >
              <Form.Control type="url" placeholder="https://example.com" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          <FaInstagram style={{ fontSize: '2rem', height: '38px' }} />
          <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
            <FloatingLabel label="Instagram" >
              <Form.Control type="url" placeholder="https://example.com" value={instagram} onChange={(e) => setInstagram(e.target.value)}  />
            </FloatingLabel>
          </Form.Group>

        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          <FaXTwitter style={{ fontSize: '2rem', height: '38px' }} />
          <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
            <FloatingLabel label="X" >
              <Form.Control type="url" placeholder="https://example.com" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          <FaLinkedin style={{ fontSize: '2rem', height: '38px' }} />
          <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
            <FloatingLabel label="LinkendIn" >
              <Form.Control type="url" placeholder="https://example.com" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}  />
            </FloatingLabel>
          </Form.Group>

        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          <LuLink style={{ fontSize: '2rem', height: '38px' }} />
          <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
            <FloatingLabel label="URL" >
              <Form.Control type="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </FloatingLabel>
          </Form.Group>
        </div>

        <div className='d-flex gap-4'>
          <Button variant="outline-primary" className='d-flex align-items-center gap-2' onClick={() => setSection('Profile')}>
            <GrFormPrevious />
            Atrás
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Registrarse
          </Button>
        </div>


      </div>

      { loading && (
        <div  className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed fixed-top' style={{ background: "#533e2a70" }}>
          <Lottie animationData={animationLoading} style={{ width: '150px', height: '150px' }} />
        </div>
      )}

    </>


  )
}

export default SocialMediaInformation;