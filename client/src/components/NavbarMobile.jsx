import React, {useState} from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { FaListUl} from 'react-icons/fa';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {IoAddCircleSharp} from 'react-icons/io5';
import {IoLogOut} from 'react-icons/io5';
import {IoMdAlert} from 'react-icons/io';
import {FaHome} from 'react-icons/fa';
import './styles/linksMobile.scss';
import { useNavigate } from "react-router-dom";


const NavbarMobile = ({name}) => {

    // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
   const [modalEliminar, setModalEliminar] = useState(false);

     
   const abrirModalEliminar=()=>{
     setModalEliminar(!modalEliminar);
   }


    let activeStyle = {
        color: "rgb(1, 116, 186)"
    };

    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/')
    }


  return (
    <>
    <div className='d-flex justify-content-between'>
        <div className="dropdown">
            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Navegar
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                <li>
                    <NavLink to="/dashboard/home" className='dropdown-item bg-light text-dark'>
                        <FaHome className='m-2' /><span className='m-2'>Inicio</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/listar" className='dropdown-item bg-light text-dark'
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                        <FaListUl className='m-2'/><span className='m-2'>Listado</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/detalles" className='dropdown-item bg-light text-dark'
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                        <IoMdAlert className='m-2'/><span className='m-2'>Detalles</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/agregar" className='dropdown-item bg-light text-dark'
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                        <IoAddCircleSharp className='m-2'/><span className='m-2'>Agregar</span>
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/dashboard/editar" className='dropdown-item bg-light text-dark'
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                        <AiFillEdit className='m-2'/><span className='m-2'>Editar</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/eliminar" className='dropdown-item bg-light text-dark'
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                        <AiFillDelete className='m-2'/><span className='m-2'>Eliminar</span>
                    </NavLink>
                </li>
            </ul>
        </div>

        <div className="dropdown">
            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                <li>
                    <span className='btn text-dark' onClick={()=>setModalEliminar(true)}><IoLogOut className='m-2' onClick={()=>setModalEliminar(true)}/>Salir</span>
                </li>

            </ul>
        </div>
        
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
                <button className="btn btn-warning" onClick={()=>abrirModalEliminar()}>Cancelar</button>
            </ModalFooter>

        </Modal>
        


    </>
  )
}

export default NavbarMobile;