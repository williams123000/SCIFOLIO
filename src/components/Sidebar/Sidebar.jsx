import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import axios from 'axios';
function Sidebar() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getData() {
      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_INFOUSER;
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
  }, []);

  const getIcon = (socialNetwork) => {
    switch (socialNetwork) {
      case 'Facebook':
        return <FaFacebook size={15} />;
      case 'Instagram':
        return <FaInstagram size={15} />;
      case 'Twitter':
        return <FaTwitter size={15} />;
      case 'LinkedIn':
        return <FaLinkedin size={15} />;
      default:
        return null; // O un ícono por defecto si prefieres
    }
  };

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <div className="SideBar p-4 d-flex flex-column align-items-center">
      <img className="ImageProfile pb-3" src={data.ImgProfile} alt="" />
      <h4>{data.Name}</h4>
      <div className='TagProfession p-2 d-flex align-items-center justify-content-center'>
        <p className='m-0'>{data.Profession}</p>
      </div>
      <hr className='w-100' />
      <div className='TagsInformation w-100'>
        <div className='w-100 d-flex align-items-center gap-3 mb-3'>
          <div className='IconInformation d-flex align-items-center justify-content-center'>
            <MdOutlineEmail size={15} />
          </div>
          <div>
            <p className='m-0 text-muted'>CORREO</p>
            <p className='m-0'>{sessionStorage.getItem('email')}</p>
          </div>
        </div>
        <div className='w-100 d-flex align-items-center gap-3 mb-3'>
          <div className='IconInformation d-flex align-items-center justify-content-center'>
            <FaPhone size={15} />
          </div>
          <div>
            <p className='m-0 text-muted'>TÉLEFONO</p>
            <p className='m-0'>{data.Phone}</p>
          </div>
        </div>
        <div className='w-100 d-flex align-items-center gap-3 mb-3'>
          <div className='IconInformation d-flex align-items-center justify-content-center'>
            <FaBirthdayCake size={15} />
          </div>
          <div>
            <p className='m-0 text-muted'>CUMPLEAÑOS</p>
            <p className='m-0'>{data.Birth}</p>
          </div>
        </div>
        <div className='d-flex w-100 p-4 justify-content-around '>
          {data.SocialNetworks.map((socialNetwork, index) => (
            <div 
            key={index} 
            className='IconInformation d-flex align-items-center justify-content-center'
            onClick={() => window.open(socialNetwork.URL, '_blank')}
            >
              {getIcon(socialNetwork.Key)}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Sidebar;