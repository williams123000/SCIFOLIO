import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import axios from 'axios';
import Lottie from "lottie-react";
import animationLoading from "../../assets/animations/loading.json";

function Sidebar({visited, dataVisited}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getData() {
      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_INFOUSER;
        console.log(visited);
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
    console.log(visited);
    console.log(dataVisited);
  }, []);

  const getIcon = (socialNetwork) => {
    switch (socialNetwork) {
      case 'facebook':
        return <FaFacebook size={20} />;
      case 'instagram':
        return <FaInstagram size={20} />;
      case 'twitter':
        return <FaTwitter size={20} />;
      case 'linkedIn':
        return <FaLinkedin size={20} />;
      case 'url':
        return <FaLinkedin size={20} />;
      default:
        return null; // O un ícono por defecto si prefieres
    }
  };

  if (loading) {
    return (
      <div className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed fixed-top' style={{ background: "#533e2a70" }}>
        <Lottie animationData={animationLoading} style={{ width: '30%', height: '30%' }} />
      </div>
    )
  }

  return (
    <>
      <div className="SideBar col-lg-2 col-12 p-4 d-flex flex-column align-items-center justify-content-center justify-content-lg-start ">
        <img className="ImageProfile pb-3" src={data.ImgProfile} alt="" />
        <h4 className='SideBarName text-center'>{data.Name}</h4>
        <div className='TagProfession p-2 d-flex align-items-center justify-content-center'>
          <p className='m-0'>{data.Profession}</p>
        </div>
        <hr className='w-100' />
        <div className='TagsInformation w-100'>
          <div className='w-100 d-flex align-items-center gap-3 mb-3'>
            <div className='IconInformation d-flex align-items-center justify-content-center'>
              <MdOutlineEmail size={15} />
            </div>
            <div className='SideBarInfoText'>
              <p className='m-0 text-muted'>CORREO</p>
              <p className='m-0'>{data.Email}</p>
            </div>
          </div>
          <div className='w-100 d-flex align-items-center gap-3 mb-3'>
            <div className='IconInformation d-flex align-items-center justify-content-center'>
              <FaPhone size={15} />
            </div>
            <div className='SideBarInfoText'>
              <p className='m-0 text-muted'>TÉLEFONO</p>
              <p className='m-0'>{data.Phone}</p>
            </div>
          </div>
          <div className='w-100 d-flex align-items-center gap-3 mb-3'>
            <div className='IconInformation d-flex align-items-center justify-content-center'>
              <FaBirthdayCake size={15} />
            </div>
            <div className='SideBarInfoText'>
              <p className='m-0 text-muted'>CUMPLEAÑOS</p>
              <p className='m-0'>{data.Birth}</p>
            </div>
          </div>
          <div className='d-flex w-100 p-4 justify-content-around '>
            {data.SocialNetworks.map((socialNetwork, index) => (
              socialNetwork.URL !== '' && (
                <div
                  key={index}
                  className='IconInformation d-flex align-items-center justify-content-center'
                  onClick={() => window.open(socialNetwork.URL, '_blank')}
                >
                  {getIcon(socialNetwork.Key)}
                </div>
              )
            ))}

          </div>
        </div>
      </div>

      {loading && (
        <div className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed fixed-top' style={{ background: "#533e2a70" }}>
          <Lottie animationData={animationLoading} style={{ width: '30%', height: '30%' }} />
        </div>
      )}
    </>
  )
}

export default Sidebar;