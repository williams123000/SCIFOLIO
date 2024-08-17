import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DataTest = [
    {
        "NameProject": "Estudio de la biodiversidad marina",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre el cambio climático",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de fotosíntesis en plantas",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Investigation sobre células madre",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre el genoma humano",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de reacción química",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Estudio de los ecosistemas terrestres",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre energía renovable",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de fuerza y movimiento",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Investigation sobre enfermedades infecciosas",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre neurociencia",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de conductividad eléctrica",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Estudio de la evolución de especies",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre astrofísica",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de resonancia magnética",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Investigation sobre el cambio de clima global",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre biotecnología",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de presión atmosférica",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Estudio de la química orgánica",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre microbiología",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de reacciones en cadena",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Investigation sobre genética y herencia",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre la teoría de la relatividad",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de combustión y energía",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Estudio de la biología molecular",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre el ADN y sus aplicaciones",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de propiedades magnéticas",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Investigation sobre el comportamiento animal",
        "Category": "Investigation",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Publicación sobre la física cuántica",
        "Category": "Publications",
        "ImgProject": "https://via.placeholder.com/150x120"
    },
    {
        "NameProject": "Experimento de dinámica de fluidos",
        "Category": "Experiments",
        "ImgProject": "https://via.placeholder.com/150x120"
    }
]

function ContentPortfolio() {
    const [items, setItems] = useState({});
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const URL = import.meta.env.VITE_URL_API;
                const URL_GET = import.meta.env.VITE_API_PORTFOLIO;
                const URL_Petition = URL + URL_GET + '/' + 'richar@email.com';
                const response = await axios.get( URL_Petition );
                console.log(response.data);
                setItems(response.data.Works.Works);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);    

    const changeCategory = (newCategory) => {
        setCategory(newCategory);
    }

    // Filtrar los ítems según la categoría seleccionada
    const filteredItems = category === 'All' 
        ? items 
        : items.filter(item => item.Category === category);

    const getCategory = (category) => {
        switch (category) {
            case 'Investigation':
                return 'Investigación';
            case 'Publications':
                return 'Publicaciones';
            case 'Experiments':
                return 'Experimentos';
            default:
                return 'Desconocido';
        }
    }

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <div className='h-100' style={{position: 'relative'}}>
            <h1>Portafolio</h1>
            <hr className="Background_Yellow" />
            <div className='mb-3'>
                <Button variant="dark" onClick={() => changeCategory("All")} style={{color: category === "All" ? "#D4BA70" : "#ECECEC"}}>Todo</Button>
                <Button variant="dark" onClick={() => changeCategory("Investigation")} style={{color: category === "Investigation" ? "#D4BA70" : "#ECECEC"}}>Investigaciones</Button>
                <Button variant="dark" onClick={() => changeCategory("Publications")} style={{color: category === "Publications" ? "#D4BA70" : "#ECECEC"}}>Publicaciones</Button>
                <Button variant="dark" onClick={() => changeCategory("Experiments")} style={{color: category === "Experiments" ? "#D4BA70" : "#ECECEC"}}>Experimentos</Button>
            </div>

            <div className='ContentPortfolio w-100 d-flex flex-wrap justify-content-around'>
                {filteredItems.map((item, index) => (
                    <div className='ItemContentPortfolio' key={index}>
                        <img src={item.ImgProject} alt="" />
                        <h6 className='mb-0'>{item.NameProject}</h6>
                        <p className='mb-0 text-muted'>{getCategory(item.Category)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContentPortfolio;