import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ContentPortfolio from './ContentPortfolio/ContentPortfolio';
import ContentAbout from './ContentAbout/ContentAbout';
import ContentResume from './ContentResume/ContentResume';
import ContentContact from './ContentContact/ContentContact';
import ContentBlog from './ContentBlog/ContentBlog';

function Portfolio() {
    const [step, setStep] = useState('About');

    const changeStep = (step) => {
        setStep(step);
    }

    const renderContent = () => {
        switch (step) {
            case 'About':
                return <ContentAbout />;
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
        <div className="Portfolio ">
            <div className="Menu-Portfolio p-2 d-flex w-50 justify-content-around">
                <Button variant="dark" onClick={() => changeStep("About")} style={{color: step == "About" ? "#D4BA70" : "#ECECEC"}}>Acerca de</Button>
                <Button variant="dark" onClick={() => changeStep("Resume")} style={{color: step == "Resume" ? "#D4BA70" : "#ECECEC"}}>Resumen</Button>
                <Button variant="dark" onClick={() => changeStep("Portfolio")} style={{color: step == "Portfolio" ? "#D4BA70" : "#ECECEC"}}>Portafolio</Button>
                <Button variant="dark" onClick={() => changeStep("Blog")} style={{color: step == "Blog" ? "#D4BA70" : "#ECECEC"}}>Blog</Button>
                <Button variant="dark" onClick={() => changeStep("Contact")} style={{color: step == "Contact" ? "#D4BA70" : "#ECECEC"}}>Contacto</Button>
            </div>

            <div className="Content-Portfolio p-4 pt-5 h-100">
                {renderContent()}
            </div>
            
        </div>
    )
}

export default Portfolio;