import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from '../components/home/Home';
import Sidebar from '../components/Sidebar';
// css
import '../styles/App.scss';
// context
import { DarkModes } from '../context/DarkMode';


const DashboardHome = () => {

  // context  
  const {modeLocalStorage, setModeLocalStorage} = useContext(DarkModes);

  // definimos el hook useNavigate en una constante
  const navigate = useNavigate();

  // state para el nombre del usuario visible en el home
  const [name, setName] = useState("usuario");

  // obtenemos el token
  const token = localStorage.getItem("token");
  // obtenemos el valor de la clave 'modes' en localStorage, si no existe devuelve null y guardamos en una constante
  const getMode = localStorage.getItem("modes");

  useEffect(() => {
    if(token){
      axios
      .get(`http://localhost:4000/user/`,{
        headers: {
          token: token,
        },
      })
      .then(({ data }) => {
        setName(data.nombre)
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
          <Sidebar name={name}/>
          <div className={modeLocalStorage ? 'content' : 'content-dark'}>
              <Home name={name}/>
          </div>
        </div>
    </>
  )
}

export default DashboardHome;