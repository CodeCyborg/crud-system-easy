import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loading from "../components/Loading";
// axios
import axios from "axios";
// obreria de animaciones
import LightSpeed from "react-reveal/Roll";



const Login = () => {

  // definimos el hook useNavigate en una contante
  const navigate = useNavigate();

  // state del valor del input para credenciales
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });

  // mensajes de logueo
  const [mensaje, setMensaje] = useState();

  // color de mensaje de logueo
  const [colorMensaje, setColorMensaje] = useState(false);

  // color de mensaje de caragando...
  const [wait, setWait] = useState(false);

  // destructuracion para obtener el correo y contraseña y se lo asignamos a inputs(state)
  const { correo, contraseña } = inputs;

  // funcion para obtener el valor que ingresemos en el form de login
  const HandleChange = (e) => {
    // cambiamos el estado, usamos spread operator para hacer copia del state y le asignamos al name el value
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // limpiamos el state de color mensaje una vez cargue/rederize el componente
  useEffect(() => {
    setColorMensaje(false)
  }, []);


  // funcion asincrona para enviar credenciales
  const onSubmit = async (e) => {

    // metodo para detener la actualizacion de la pagina al enviar form, comportamiento natural de los formularios
    e.preventDefault();

    if (correo !== "" && contraseña !== "") {
      setWait(true)
      const Usuario = {
        correo,
        contraseña,
      };
      await axios
        .post("https://users-system-easy.onrender.com/users/login", Usuario)
        .then((res) => {
          const { data } = res;
          setWait(false)
          setMensaje(data.mensaje);
          if(data.mensaje === "Usuario logueado correctamente"){
            setColorMensaje(true)
          }
          //setTimeout se ejecuta en un tiempo determinado
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem('token', data?.usuario.token)
            if(data.usuario.token){
              navigate('/dashboard/home')
            }else{
              navigate('/')
            }
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo u contraseña incorrecta");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
        setInputs({ correo: "", contraseña: "" });
    }
  };


  return (
    <div className='container-fluid vh-100 header-landing d-flex'>
    <div className='row mx-auto'>
      <div className='col mx-auto col-form'>

        <div className='text-container w-100 mb-4'>
          {mensaje ? <Message mensaje={mensaje} colorMensaje={colorMensaje}/> : null}
          {wait ? <Loading/> : null}
          <LightSpeed left>
            <h1>Hola De Nuevo!</h1>
            <h5>Por favor, ingrese sus credenciales. <span>si las ha olvidado contactese con el equipo de atención al cliente: systemeasysecurity@col.com</span></h5>
          </LightSpeed >
        </div>

        <div className='form-container col-md-6'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-4'>
              <input className='form-control' 
                onChange={(e) => HandleChange(e)}
                value={correo}
                name="correo"
                id="correo"
                type="email"
                placeholder="Correo..."
                autoComplete="off"/>
            </div>

            <div className='mb-4'>
              <input className='form-control'
                onChange={(e) => HandleChange(e)}
                value={contraseña}
                name="contraseña"
                id="contraseña"
                type="password"
                placeholder="Contraseña..."
                autoComplete="off" />
            </div>

            <div className='d-flex justify-content-between'>
              <button className='btn btn-warning'>Iniciar sesión</button>
              {/* <button className='btn btn-warning' onClick={changeShow}>Registrate</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
  )
}

export default Login