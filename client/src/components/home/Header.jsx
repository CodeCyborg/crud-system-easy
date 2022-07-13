import React, { useEffect, useContext } from 'react';
import { FcLike } from 'react-icons/fc';
import { BsToggleOn } from 'react-icons/bs';
// css
import '../../styles/App.scss';
// context
import { DarkModes } from '../../context/DarkMode';


const Header = ({name}) => {

  // context
  const {darkModeToogle, modeLocalStorage, setModeLocalStorage} = useContext(DarkModes);

  // obtenemos el valor de la clave 'modes' en localStorage, si no existe devuelve null y guardamos en una constante
  const getMode = localStorage.getItem("modes");

  // useEffect sin dependencias
  useEffect(() => {
    if(getMode ===  "dark"){
      setModeLocalStorage(false)
    }else{
      setModeLocalStorage(true)
    }
  }, [getMode, setModeLocalStorage]);

  return (
    // operador condicional
    <div className={modeLocalStorage ? 'header-home d-flex justify-content-between mt-3' : 'header-home-dark d-flex justify-content-between mt-3'}>
      <div>
        <h1>Bienvenido, {name} <FcLike/></h1>
        <span>Continúa administrando tus datos y registros el dia de hoy...</span>
      </div>
      <div className='d-flex'>
        <div className='d-flex align-items-center d-none d-xl-none d-xxl-flex'>
          <h5 className='m-1'>{modeLocalStorage ?  'Mode Dark' : 'Mode Light'}</h5>
          <BsToggleOn onClick={darkModeToogle} className='mode'/>
        </div>
      </div>
    </div>
  )
}

export default Header