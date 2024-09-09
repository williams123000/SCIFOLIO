import { Form, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DateInput } from 'rsuite';
import { useState } from "react";
import { Drawer } from 'vaul';
import styles from './App.module.css';
import { RiEditFill } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios";
import { MdOutlineNavigateNext } from "react-icons/md";
import Lottie from "lottie-react";
import animationLoading from "../../assets/animations/loading.json";
import { setCache, getCache } from "../../settings/utilities/CacheLocalStorage";
import { Alert } from "react-bootstrap";
import Swal from 'sweetalert2';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ProfileInformation({ setSection }) {
  const [imagesProfile, setImagesProfile] = useState([]);
  const [visible, setVisible] = useState(false);
  const [urlImageSelected, setUrlImageSelected] = useState('');
  const [birthday, setBirthday] = useState('');
  const [loading, setLoading] = useState(true);
  const [profession, setProfession] = useState('');

  useEffect(() => {
    async function fetchDataImagesProfile() {
      var response = getCache('imagesProfile');
      if (!response) {
        try {
          const URL = import.meta.env.VITE_URL_API + import.meta.env.VITE_API_IMAGESPROFILE;
          response = await axios.get(URL);
          setCache('imagesProfile', response, 1000 * 60 * 10);
        } catch (error) {
          console.error(error);
        }
      }
      const data = response.data;
      const imgs = data.imgs;
      setImagesProfile(imgs);
      setUrlImageSelected(imgs[0]);
      setLoading(false);
    }
    fetchDataImagesProfile();

    const dateBirtday = localStorage.getItem('birthday');
    console.log(dateBirtday);
    if (dateBirtday) {
      setBirthday(dateBirtday);
    }

    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
      setUrlImageSelected(profileImage);
    }

    const profession = localStorage.getItem('profession');
    if (profession) {
      setProfession(profession);
    }
  }, []);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Mes - 1 porque los meses en JavaScript van de 0 a 11
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  
    const [dayPart, monthPart, yearPart] = formattedDate.split(' de ');
  
    return `${monthPart.charAt(0).toUpperCase() + monthPart.slice(1)} ${dayPart}, ${yearPart}`;
  };

  const handleNext = () => {
    if (!birthday) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar una fecha de nacimiento',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    if (!profession) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar tu profesión',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const birthdayFormatted = formatDate(birthday); // Formatear la fecha

    localStorage.setItem('birthdayFormatted', birthdayFormatted);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('profileImage', urlImageSelected);
    localStorage.setItem('profession', profession);
    setSection('Profession');
  }

  return (
    <>
      <Drawer.Root
        shouldScaleBackground
        open={visible}
        onOpenChange={setVisible}
      >
        <Drawer.Portal>
          <Drawer.Overlay className={styles.overlay} />
          <Drawer.Content className={styles.contentDraw}>
            <div className={styles.contentWrap}>
              <div className={styles.line} />
              <div className={styles.content}>
                <div className="d-flex gap-2 flex-wrap justify-content-center h-100" style={{ overflowY: 'scroll' }}>
                  {imagesProfile.map((img, index) => (
                    <Button
                      key={index}
                      style={{ height: 'fit-content', aspectRatio: '1/1', objectFit: 'cover' }}
                      onClick={() => {
                        setUrlImageSelected(img);
                        setVisible(false);
                      }}>
                      <img src={img} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <div className="d-flex w-100 h-100 flex-column justify-content-center align-items-center gap-3">
        <div className="d-flex w-100 justify-content-center align-items-center mb-4">
          <div className="editable-image" style={{ borderRadius: '100%', background: '#D4BA70' }} onClick={() => setVisible(true)}>
            <img src={urlImageSelected} alt="" />
            <div className="edit-icon d-flex align-items-center justify-content-center w-100 h-100">
              <RiEditFill style={{ fontSize: '3rem', height: '38px' }} />
            </div>
          </div>
        </div>
        
        <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
          <FloatingLabel  label="Fecha de nacimiento" >
          <Form.Control type={'date'} value={birthday} name='birthday' onChange={(e) => setBirthday(e.target.value)}/>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} xs={10} lg={3} className="mb-2 text-center">
          <FloatingLabel label="Profesión">
            <Form.Control type={"text"} value={profession} placeholder="Profesión" onChange={(e) => setProfession(e.target.value)}/>
          </FloatingLabel>
        </Form.Group>
        <Button className="d-flex align-items-center gap-2 mt-4" onClick={handleNext}>Siguiente <MdOutlineNavigateNext /></Button>
      </div>

      {
        loading && (
          <div className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed fixed-top' style={{ background: "#533e2a70" }}>
            <Lottie animationData={animationLoading} style={{ width: '30%', height: '30%' }} />
          </div>
        )
      }
    </>
  )
}


export default ProfileInformation;