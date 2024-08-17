import { MdPhotoCamera } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";


// Import Swiper styles
import 'swiper/css';
function ContentAbout() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {

      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_ABOUT;
        const URL_Petition = URL + URL_GET + '/' + 'richar@email.com';
        const response = await axios.get( URL_Petition );
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
      case 'Reading':
        return <FaBookReader size={40} />;
      case 'Painting':
        return <FaPaintBrush size={40} />;
      default:
        return null; // O un ícono por defecto si prefieres
    }
  };

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <div className='h-100' style={{ position: 'relative', overflowY: 'scroll' }}>
      <h1>Acerca de</h1>
      <hr className="Background_Yellow" />
      <p>{data.Resume.Text}</p>
      <h2>Pasatiempos</h2>
      <div className="d-flex flex-wrap justify-content-around gap-3 mb-5">
        {data.Hobbies.Hobbies.map((hobbie, index) => (
          <div key={index} className="AboutHobbies d-flex gap-3 p-4">
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
            slidesPerView={2}
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
            slidesPerView={4}
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
  )
}

export default ContentAbout;