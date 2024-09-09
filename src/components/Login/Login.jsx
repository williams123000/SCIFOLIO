
import { useState } from 'react';
import imgLogin from '../../assets/images/login.jpg';
import ContentLogin from './ContentLogin';
import ContentSignUp from './ContentSignUp';
import { motion, AnimatePresence } from "framer-motion"

function Login() {
  const [type, setType] = useState('login');
  const renderContent = (type) => {
    switch (type) {
      case 'login': {
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}>
            <ContentLogin setType={setType} />
          </motion.div>
        )
      }

      case 'signUp': {
        return (
          <>
            <motion.div
              key="signUp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}>
              <ContentSignUp setType={setType} />
            </motion.div>
          </>
        )
      }

    }
  }


  return (
    <AnimatePresence mode='wait' >
      <motion.div
        key="/login"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className='w-100 h-100'
      >
        <div className="Home p-lg-5 p-0 h-100 d-flex justify-content-center">
          <div className="Login w-100 p-4 d-flex">

            <div className=' col-lg-6 col-12 p-4 d-flex flex-column justify-content-center'>
              <AnimatePresence mode='wait' >
                {renderContent(type)}
              </AnimatePresence>
            </div>
            <div className='col-6 d-none d-lg-block position-relative'>
              <h1 className='position-absolute pe-4 pt-2' style={{ right: 0, color: '#1E1E1E' }}>SciFolio</h1>
              <img
                src={imgLogin}
                className="w-100 h-100 object-fit-cover rounded" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login;