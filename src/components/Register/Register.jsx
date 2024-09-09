import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from "react";
import 'rsuite/dist/rsuite.min.css';
import ProfileInformation from "./ProfileInformation";
import SocialMediaInformation from "./SocialMediaInformation";
import { motion, AnimatePresence } from "framer-motion"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Register() {
  const [section, setSection] = useState('Profile');

  const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const handleChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index][event.target.name] = event.target.value;
    setSocialLinks(newSocialLinks);
  };

  const sectionRender = () => {
    switch (section) {
      case 'Profile': {
        return (
          <motion.div
            key="profileInformation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="w-100 h-100"
          >
            <ProfileInformation setSection={setSection} />
          </motion.div>
        )
      }

      case 'Profession': {
        return (
          <motion.div
            key="professionInformation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="w-100 h-100"
          >
            <SocialMediaInformation setSection={setSection} />
          </motion.div>

        )

      }

      default: {
        return (
          <Form>
            <div className="d-flex align-items-center w-100 gap-2">
              <FaFacebook style={{ fontSize: '3rem', height: '38px' }} />
              <FloatingLabel label="URL" className="w-100">
                <Form.Control type="url" placeholder="https://example.com" name="url" />
              </FloatingLabel>
            </div>
            <div className="d-flex align-items-center w-100 gap-2">
              <FaInstagram style={{ fontSize: '3rem', height: '38px' }} />
              <FloatingLabel label="URL" className="w-100">
                <Form.Control type="url" placeholder="https://example.com" name="url" />
              </FloatingLabel>
            </div>
            <div className="d-flex align-items-center w-100 gap-2">
              <FaTwitter style={{ fontSize: '3rem', height: '38px' }} />
              <FloatingLabel label="URL" className="w-100">
                <Form.Control type="url" placeholder="https://example.com" name="url" />
              </FloatingLabel>
            </div>
            <div className="d-flex align-items-center w-100 gap-2">
              <FaLinkedin style={{ fontSize: '3rem', height: '38px' }} />
              <FloatingLabel label="URL" className="w-100">
                <Form.Control type="url" placeholder="https://example.com" name="url" />
              </FloatingLabel>
            </div>




            {socialLinks.map((link, index) => (
              <div key={index}>

                <FloatingLabel
                  controlId={`floatingUrl${index}`}
                  label="URL"
                  className="mb-3"
                >
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    name="url"
                    value={link.url}
                    onChange={(e) => handleChange(index, e)}
                  />
                </FloatingLabel>
              </div>
            ))}

            <Button variant="primary" onClick={handleAddSocial}>
              Agregar Red Social
            </Button>
          </Form>
        )
      }
    }
  }

  return (

    <AnimatePresence mode='wait' >
      <motion.div
        key="/register"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className='w-100 h-100'
      >
        <div className="w-100 h-100 p-lg-5 p-0 d-flex justify-content-center">
          <div className="Login w-100 h-100 p-lg-4 p-3 d-flex flex-column gap-5 align-items-center justify-content-center">
            <div className="w-100 h-100" style={{ position: 'relative' }}>
              <AnimatePresence mode='wait' >
                {sectionRender()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Register;