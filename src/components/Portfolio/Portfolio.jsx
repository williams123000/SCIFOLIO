import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ContentPortfolio from './ContentPortfolio/ContentPortfolio';
import ContentAbout from './ContentAbout/ContentAbout';
import ContentResume from './ContentResume/ContentResume';
import ContentContact from './ContentContact/ContentContact';
import ContentBlog from './ContentBlog/ContentBlog';
import { MdEdit } from "react-icons/md";
import ModalEditAbout from './ContentAbout/ModalEditAbout';
import ModalEditResume from './ContentResume/ModalEditResume';
import ModalEditPortfolio from './ContentPortfolio/ModalEditPortfolio';
import ModalEditContact from './ContentContact/ModalEditContact';
function Portfolio({ step, changeStep,isDesktop , visited, dataVisited }) {

  const [modalEditAbout, setModalEditAbout] = useState(false);
  const [modalEditResume, setModalEditResume] = useState(false);
  const [modalEditPortfolio, setModalEditPortfolio] = useState(false);
  const [modalEditContact, setModalEditContact] = useState(false);

  
  const renderContent = () => {
    switch (step) {
      case 'About':
        return <ContentAbout isDesktop={isDesktop} visited={visited} dataVisited={dataVisited}/>;
      case 'Resume':
        return <ContentResume />;
      case 'Portfolio':
        return <ContentPortfolio />;
      case 'Blog':
        return <ContentBlog />;
      case 'Contact':
        return <ContentContact />;
      default:
        return <div>Bienvenido a mi portafolio. Selecciona una opción del menú.</div>;
    }
  }

  return (
    <div className="Portfolio d-block d-lg-block col-12 col-lg-10">
      <div className="Menu-Portfolio d-none d-lg-flex p-2 w-50 justify-content-around">
        <Button className='d-flex align-items-center gap-3 justify-content-center' variant="dark" onClick={() => changeStep("About")} style={{ color: step == "About" ? "#D4BA70" : "#ECECEC" }}>Acerca de<MdEdit onClick={() => {
          setModalEditAbout(true);
        }} /></Button>
        <Button className='d-flex align-items-center gap-3 justify-content-center' variant="dark" onClick={() => changeStep("Resume")} style={{ color: step == "Resume" ? "#D4BA70" : "#ECECEC" }}>Resumen<MdEdit onClick={() => {
          setModalEditResume(true);
        }}/></Button>
        <Button className='d-flex align-items-center gap-3 justify-content-center' variant="dark" onClick={() => changeStep("Portfolio")} style={{ color: step == "Portfolio" ? "#D4BA70" : "#ECECEC" }}>Portafolio<MdEdit onClick={() => {
          setModalEditPortfolio(true);
        }}/></Button>
        <Button className='d-flex align-items-center gap-3 justify-content-center' variant="dark" onClick={() => changeStep("Blog")} style={{ color: step == "Blog" ? "#D4BA70" : "#ECECEC" }}>Blog<MdEdit /></Button>
        <Button className='d-flex align-items-center gap-3 justify-content-center' variant="dark" onClick={() => changeStep("Contact")} style={{ color: step == "Contact" ? "#D4BA70" : "#ECECEC" }}>Contacto<MdEdit onClick={() =>{
          setModalEditContact(true);
        }}/></Button>
      </div>

      <div className="Content-Portfolio p-4 pt-5 h-100 w-100">
        {renderContent()}
      </div>
      <ModalEditAbout show={modalEditAbout} onHide={() => setModalEditAbout(false)} />
      <ModalEditResume show={modalEditResume} onHide={() => setModalEditResume(false)} />
      <ModalEditPortfolio show={modalEditPortfolio} onHide={() => setModalEditPortfolio(false)} /> 
      <ModalEditContact show={modalEditContact} onHide={() => setModalEditContact(false)} /> 
        
    </div>


  )
}

export default Portfolio;