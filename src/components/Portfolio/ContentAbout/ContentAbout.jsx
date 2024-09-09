import { MdPhotoCamera } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdNoPhotography } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

// Import Swiper styles
import 'swiper/css';

import ModalResume from "./Modals/ModalResume";
import ModalHobbies from "./Modals/ModalHobbies";
function ContentAbout({ isDesktop , visited, dataVisited }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  const [showModalResume, setShowModalResume] = useState(false);
  const [showModalHobbies, setShowModalHobbies] = useState(false);

  useEffect(() => {
    async function getData() {

      try {

        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_ABOUT;
        const URL_Petition = URL + URL_GET + '/' + sessionStorage.getItem('uid');
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

  const getIcon = (hobbieKey) => {
    switch (hobbieKey) {
      case 'Lectura':
        return <FaBookReader size={40} />;
      case 'Pintura':
        return <FaPaintBrush size={40} />;
      case 'Cocina':
        return <TbToolsKitchen2 size={40} />;
      case 'Fotografía':
        return <MdNoPhotography size={40} />;
      case 'Música':
        return <FaMusic size={40} />;
      default:
        return null; // O un ícono por defecto si prefieres
    }
  };

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <>
      <div className='h-100' style={{ position: 'relative', overflowY: 'scroll' }}>
        <div className="d-flex gap-2 align-items-center">
          {visited ? null : <h4 className="d-flex align-items-center" onClick={() => setShowModalResume(true)}><MdModeEdit /></h4>}
          <h1>Acerca de </h1>
        </div>

        <hr className="Background_Yellow" />
        <p>{data.Resume.Text}</p>
        <div className="d-flex gap-2 align-items-center">
          <h4 className="d-flex align-items-center" onClick={() => setShowModalHobbies(true)}><MdModeEdit /></h4>
          <h1>Pasatiempos </h1>
        </div>
        <div className="d-flex flex-wrap justify-content-around gap-3 mb-5">
          {data.Hobbies.Hobbies.map((hobbie, index) => (
            <div key={index} className="AboutHobbies col-12 col-lg-5 d-flex gap-3 p-4">
              <div className="IconHobbies">
                {getIcon(hobbie.Key)}
              </div>
              <div>
                <h4 className="mb-0">{hobbie.Hobbie}</h4>
                <p className="mb-0 text-muted">{hobbie.Resume}</p>
              </div>
            </div>
          ))}
        </div>
        <h2>Testimonios</h2>


        <div className="w-100 mb-5">
          <div>
            <Swiper
              spaceBetween={50}
              slidesPerView={
                isDesktop ? 2 : 1
              }
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {data.Testimonials.Testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="Testimonies d-flex p-3">
                    <div>
                      <img className="ImageTestimonies" src={testimonial.Image} alt="" />
                    </div>
                    <div className="w-100 d-flex flex-column justify-content-center">
                      <h5 className="mb-0">{testimonial.Name}</h5>
                      <p className="mb-0 text-muted">{testimonial.Text}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <h2>Certificaciones</h2>
        <div>
          <div>
            <Swiper
              spaceBetween={50}
              slidesPerView={
                isDesktop ? 4 : 1
              }
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {data.Certifications.Certifications.map((certification, index) => (
                <SwiperSlide key={index}>
                  <div className="Testimonies d-flex gap-3 p-4">
                    <div className="IconHobbies">
                      <PiCertificateFill size={40} />
                    </div>
                    <div className="w-100 d-flex flex-column justify-content-center">
                      <h6 className="mb-0">{certification}</h6>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>


      </div>

      <ModalResume showModalResume={showModalResume} setShowModalResume={setShowModalResume} data={data.Resume.Text}/>
      <ModalHobbies showModal={showModalHobbies} setShowModal={setShowModalHobbies} data={data.Hobbies.Hobbies}/>
    </>
  )
}

export default ContentAbout;