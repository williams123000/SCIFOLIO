import Sidebar from "../Sidebar/Sidebar";
import Portfolio from "../Portfolio/Portfolio";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { BottomNavigation } from "reactjs-bottom-navigation";
import { GoPersonFill } from "react-icons/go";
import { MdOutlineWork } from "react-icons/md";
import { PiNewspaperFill } from "react-icons/pi";
import { MdPermContactCalendar } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { useParams } from 'react-router-dom';


function Home({isDesktop}) {
  const [step, setStep] = useState('About');
  const [visited, setVisited] = useState(false);
  const [dataVisited, setDataVisited] = useState('');
  const [loading, setLoading] = useState(true);

  const changeStep = (step) => {
    setStep(step);
  }

  const changeStepNav = (step) => {
    changeStep(step);
  }

  const { id } = useParams(); // Captura el parámetro dinámico de la URL
  
  useEffect(() => {
    // Verifica si hay un parámetro 'id' en la URL
    if (id) {
      setVisited(true);
      setDataVisited(id);
      
    }
    setLoading(false);
  }, []); // El efecto se ejecutará cuando 'id' cambie


  const bottomNavItems = [
    {
      title: "Perfil",
      icon: <HiHome />, // just for example
      activeIcon: <HiHome color="#292929" />,
      onClick: () => {
        const domElement = document.getElementsByClassName('SideBar')[0];
        domElement.classList.remove('d-none');
        domElement.classList.add('d-flex');
      },
    },
    {
      title: "Acerca de",
      icon: <GoPersonFill />, // just for example
      activeIcon: <GoPersonFill color="#292929" />,
      onClick: () => {
        const domElement = document.getElementsByClassName('SideBar')[0];
        domElement.classList.remove('d-flex');
        domElement.classList.add('d-none');
        changeStepNav('About');
      },
    },
    {
      title: "Resumen",
      icon: <PiNewspaperFill />, // just for example
      activeIcon: <PiNewspaperFill color="#292929" />,
      onClick: () => {
        const domElement = document.getElementsByClassName('SideBar')[0];
        domElement.classList.remove('d-flex');
        domElement.classList.add('d-none');
        changeStepNav('Resume');
      }
    },
    {
      title: "Portafolio",
      icon: <MdOutlineWork />, // just for example
      activeIcon: <MdOutlineWork color="#292929" />,
      onClick: () => {
        const domElement = document.getElementsByClassName('SideBar')[0];
        domElement.classList.remove('d-flex');
        domElement.classList.add('d-none');
        changeStepNav('Portfolio');
      }
    },

    {
      title: "Contacto",
      icon: <MdPermContactCalendar />, // just for example
      activeIcon: <MdPermContactCalendar color="#292929" />,
      onClick: () => {
        const domElement = document.getElementsByClassName('SideBar')[0];
        domElement.classList.remove('d-flex');
        domElement.classList.add('d-none');
        changeStepNav('Contact');
      }
    }
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode='wait' >
      <motion.div
        key="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className='w-100 h-100'
      >
        <div className="Home p-0 p-lg-5 gap-4 d-flex">
          <Sidebar visited={visited} dataVisited={dataVisited}/>

          <Portfolio step={step} changeStep={changeStep} isDesktop={isDesktop} visited={visited} dataVisited={dataVisited} />
          <div className="d-lg-none">
            <BottomNavigation
              items={bottomNavItems}
              selected={0}
              onItemClick={(item) => console.log(item)}
              activeBgColor="#D4BA70"
              activeTextColor="#292929"
            />
          </div>

        </div>
      </motion.div>
    </AnimatePresence>

  );
}

export default Home;