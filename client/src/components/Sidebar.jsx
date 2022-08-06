import React, {useState, useContext} from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {AiOutlineEdit, AiOutlineDelete,AiOutlineHome} from 'react-icons/ai';
import {BsCardChecklist} from 'react-icons/bs';
import {IoLogOut} from 'react-icons/io5';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {HiOutlineClipboardList} from 'react-icons/hi';
import {MdOutlineExpandMore} from 'react-icons/md';
import '../styles/Sidebar.scss';
import { useNavigate } from "react-router-dom";
// context
import { DarkModes } from '../context/DarkMode';

const Sidebar = () => {

    const {modeLocalStorage} = useContext(DarkModes);

    // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
   const [modalEliminar, setModalEliminar] = useState(false);

     
   const abrirModalEliminar=()=>{
     setModalEliminar(!modalEliminar);
   }

   // definimos el hook useNavigate en una contante
    const navigate = useNavigate();

    // funcion para cerrar sesión
    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/')
    }

    let activeStyle = {
        color: "white"
    };
    
  return (
    <div className={modeLocalStorage ? 'sidebar d-none d-xl-none d-xxl-block' : 'sidebar-dark d-none d-xl-none d-xxl-block'}>

        <div className='d-flex flex-column'>
            <h5 className='text-center mt-4 text-light'>Easy Easy De'Avila</h5>
            <p className='text-center text-success'>V-demo 0.1</p>
        </div>

        <ul>
        <p className='mb-5 text-secondary text-center'>MENU</p>
            <li>
                <NavLink to="/dashboard/home" className="w-100 h-100 d-block">
                  <AiOutlineHome className='m-2' /><span className='m-2 text-secondary'>Inicio</span>
                </NavLink>
            </li>
            <hr/>
            <li>
                <NavLink to="/dashboard/listar" className="w-100 h-100 d-block" 
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
                }>
                    <BsCardChecklist className='m-2'/><span className='m-2'>Listado</span>
                </NavLink>
            </li>
            <hr/>
            {/* <li>
                <NavLink to="/dashboard/detalles" className="w-100 h-100 d-block" 
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
                }>
                    <HiOutlineClipboardList className='m-2'/><span className='m-2'>Detalles</span>
                </NavLink>
            </li> */}
            {/* <hr/> */}
            <li>
                <NavLink to="/dashboard/agregar" className="w-100 h-100 d-block" 
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
                }>
                    <IoIosAddCircleOutline className='m-2'/><span className='m-2'>Agregar</span>
                </NavLink>
            </li>
            <hr/>
            <li>
                <NavLink to="/dashboard/editar" className="w-100 h-100 d-block" 
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
                }>
                    <AiOutlineEdit className='m-2'/><span className='m-2'>Editar</span>
                </NavLink>
            </li>
            <hr/>
            <li>
                <NavLink to="/dashboard/eliminar" className="w-100 h-100 d-block" 
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
                }>
                    <AiOutlineDelete className='m-2'/><span className='m-2'>Eliminar</span>
                </NavLink>
            </li>
        </ul>

        <div className="dropdown d-flex justify-content-center">

            <button className="btn btn-outline-dark text-white dropdown-toogle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               admin <MdOutlineExpandMore/>
            </button>

            <ul className="dropdown-menu bg-dark text-light" aria-labelledby="dropdownMenuButton1">
                <li className='w-100 h-100'>
                    <span className='btn text-light' onClick={()=>setModalEliminar(true)}><IoLogOut className='m-2' onClick={()=>setModalEliminar(true)}/>Salir</span>
                </li>
            </ul>
            
        </div>


        <Modal isOpen={modalEliminar}>
                {/* <ModalHeader style={{display: "block"}}>
                    <span style={{float: "right"}}>X</span>
                </ModalHeader> */}
            <ModalBody>
                <div className="form-group">
                <p>¿DESEA CERRAR LA SESIÓN?</p>
                </div>
            </ModalBody>

            <ModalFooter>
                <button className="btn btn-danger" onClick={logout}>Confirmar</button>
                <button className="btn btn-dark" onClick={()=>abrirModalEliminar()}>Cancelar</button>
            </ModalFooter>

        </Modal>

    </div>
  )
}

export default Sidebar;