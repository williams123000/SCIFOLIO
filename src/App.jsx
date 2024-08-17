import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/Home/Home'
import Login from './components/Login/Login'

function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logged = sessionStorage.getItem('logged')
    if (!logged) {
      console.log('No hay sesión iniciada');
      setLogged(false);
    }

    if (logged) {
      console.log('Sesión iniciada');
      setLogged(true);
    }

    setLoading(false);
  }, [])

  if (loading) {
    return (
      <div className='App'>
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <>
      <div className='App'>
        {logged ?
          <Home />
          :
          <Login />
        }
      </div>
    </>
  )
}

export default App
