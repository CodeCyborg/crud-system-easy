import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Listado from '../pages/Listado';
// css
import '../styles/App.scss';
// axios
import axios from 'axios';
// context
import { DarkModes } from '../context/DarkMode';

const DashboardListar = ({name}) => {

  // definimos el hook useNavigate en una constante
  const navigate = useNavigate();

  // obtenemos el token en el localStorage y lo guardamos en una constante
  const token = localStorage.getItem("token");
  // obtenemos el valor de la clave 'modes' en localStorage, si no existe devuelve null y guardamos en una constante
  const getMode = localStorage.getItem("modes");
  
  // context  
  const {modeLocalStorage, setModeLocalStorage} = useContext(DarkModes);

  useEffect(() => {
    if(token){
      axios
      .get(`http://localhost:4000/user/`,{
        headers: {
          token: token,
        },
      })
      .then(({ data }) => {
        //console.log(data);
      })
      .catch((error) => console.error(error));
    }else{
      navigate('/')
    }
    }, [navigate, token]);

    
    useEffect(() => {
      if(getMode ===  "dark"){
        setModeLocalStorage(false)
      }else{
        setModeLocalStorage(true)
      }
    }, [getMode, setModeLocalStorage]);
    

  return (
    <>
        <div className='flex'>
            <Sidebar/>
          <div className={modeLocalStorage ? 'content' : 'content-dark'}>
            <Listado name={name}/>
          </div>
        </div>
    </>
  )
}

export default DashboardListar;