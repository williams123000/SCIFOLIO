import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import AnimatedCursor from "react-animated-cursor"
import Register from './components/Register/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { AnimatePresence } from "framer-motion"
function App() {
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1024); // Define el ancho para considerar "escritorio"
    };

    updateMedia(); // Comprobar el tamaño de la ventana al cargar

    window.addEventListener('resize', updateMedia); // Añadir listener para el redimensionamiento

    return () => window.removeEventListener('resize', updateMedia); // Eliminar el listener al desmontar
  }, []);



  return (
    <>
      <Router>
        <div className='App user-select-none'>
          {isDesktop && (
            <AnimatedCursor
              color="255, 255, 255"
              innerSize={7}
              outerSize={35}
              innerScale={1}
              innerStyle={{ zIndex: 9999 }}
              outerScale={1.7}
              outerAlpha={0.4}
              outerStyle={{ zIndex: 9999 }}
            />
          )}
          <Routes>

            <Route path="/" element={<PrivateRoute element={<Home isDesktop={isDesktop}/>} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:id" element={<Home isDesktop={isDesktop}/>}/>


          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;