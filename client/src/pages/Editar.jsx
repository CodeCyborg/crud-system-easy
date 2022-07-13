import React, {useState, useEffect, useContext} from 'react';
import {AiFillEdit} from 'react-icons/ai';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavbarMobile from '../components/NavbarMobile';
import SpinnerLoading from '../components/SpinnerLoading';
// css
import '../styles/Editar.scss';
// axios
import axios from 'axios';
// context
import { DarkModes } from '../context/DarkMode';

// endpoint para obtener todos los equipos
const getAllEquipment = "http://localhost:8080/registers/all";
// endpoint para actualizar un equipo
const updateEquipment= "http://localhost:8080/registers/update/";

const Editar = ({name}) => {

  // context
  const {modeLocalStorage} = useContext(DarkModes)

  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
  const [data, setData] = useState([]);

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL 
  const [modalEditar, setModalEditar]=useState(false);

  // HOOK USESTATE PARA CUANDO SELECCIONEMOS UN REGISTRO (SELECCIONAR UN DATA EN ESPECIFICO PARA LUEGO REALIZAR ALGUNA FUNCION)
  const [seleccionado, setSeleccionado] = useState({
    idproducto: '',
    categoria: '',
    descripcion: '',
    estado: '',
    serial: '',
    mac: '',
    fecha: ''
  })

  const abrirModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const usuarioSeleccionado=(registro, caso)=>{
    setSeleccionado(registro);
    (caso === "Editar")&&abrirModalEditar();
  }

  // funcion para capturar el valor del input
  const handleChange=e=>{
    // se acdestructura para acceder al name y value del input
    const {name, value} = e.target;
    // prevState Lo que contiene es el valor del estado anterior
    setSeleccionado(prevState=>({
      // spread operator para hacer copia de prevState y le pasamos al name el value
      ...prevState,
      [name]: value
    }))
  }

  // PETICIONES
  const peticionGet=()=>{
    setTimeout(() => {
      axios.get(getAllEquipment)
      .then(response=>{
        setData(response.data)
      })
    }, 150)
  }
  
  const peticionPut=async()=>{
      await axios.put(updateEquipment+seleccionado._id, seleccionado)
      .then(()=>{
        let dataNueva=data;
        // eslint-disable-next-line array-callback-return
        dataNueva.map(registro=>{
          if(seleccionado._id===registro._id){
            registro.idproducto=seleccionado.idproducto;
            registro.categoria=seleccionado.categoria;
            registro.descripcion=seleccionado.descripcion;
            registro.estado=seleccionado.estado;
            registro.serial=seleccionado.serial;
            registro.mac=seleccionado.mac;
            registro.fecha=seleccionado.fecha;
          }
        })
        setData(dataNueva);
        abrirModalEditar();
      }

      )
  }

  useEffect(()=>{
    peticionGet();
  },[])



  return (
    <>
    <div className='d-xxl-none navbarMobile'>
      <NavbarMobile name={name}/>
    </div>
    <div className={modeLocalStorage ? 'container-fluid mt-3 editar' : 'container-fluid bg-dark text-light mt-3 editar'}>
    <h1 className='text-center'>Aqui podrás editar tus equipos!</h1>
        <div className="row">
            <div className='col'>
                <div className='p-1 table-div scroll'>
                {data.length > 0 ? <table className={modeLocalStorage ? "table" : 'table table-dark'}>
                    <thead>
                        <tr className=''>
                            {/* <th>Id De Registro</th> */}
                            <th scope="col">Acciones</th>
                            <th>Id</th>
                            <th>Categoria/Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Serial</th>
                            <th>Mac</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(registro=>{
                            return(
                              <tr className='text-uppercase' key={registro._id}>
                                {/* <td>{registro._id}</td> */}
                                <td>
                                  <button onClick={()=>usuarioSeleccionado(registro, "Editar")} className={modeLocalStorage ? "btn btn-sm btn-dark mx-2" : '"btn btn-sm btn-secondary mx-2"'}><AiFillEdit/></button>
                                </td>
                                <td>{registro.idproducto}</td>
                                <td>{registro.categoria}</td>
                                <td>{registro.descripcion}</td>
                                <td>{registro.estado}</td>
                                <td>{registro.serial}</td>
                                <td>{registro.mac}</td>
                                <td>{registro.fecha}</td>
                              </tr>
                            )
                        })}
                    </tbody>
                </table> : <SpinnerLoading/>}
                


                  <Modal isOpen={modalEditar}>
                        {/* <ModalHeader style={{display: "block"}}>
                            <span style={{float: "right"}}>X</span>
                        </ModalHeader> */}

                      <ModalBody>
                          <div className="form-group">
                              <h3>EDITAR EQUIPO</h3>
                              <br/>
                              <label>Editar Id Del Producto</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.idproducto} name="idproducto" className="form-control" type="number"/>
                              <br/>
                              <label>Editar Categoria</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.categoria} name="categoria" className="form-control" type="text"/>
                              <br/>
                              <label>Editar Descripción/Nombre</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.descripcion} name="descripcion" className="form-control" type="text"/>
                              <br/>
                                <label>Editar Estado</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.estado} name="estado" className="form-control" type="text"  />
                              <br/>
                              <label>Editar Serial</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.serial} name="serial" className="form-control" type="number" />
                              <br/>
                              <label>Editar Mac</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.mac} name="mac" className="form-control" type="number" />
                              <br/>
                              <label>Editar Fecha</label>
                                <input onChange={handleChange} value={seleccionado && seleccionado.fecha} name="fecha" className="form-control" type="date" />
                              <br/>
                          </div>
                      </ModalBody>

                      <ModalFooter>
                          <button className="btn btn-success" onClick={()=>peticionPut()}>Editar</button>
                          <button className="btn btn-danger" onClick={()=>abrirModalEditar()}>Cancelar</button>
                      </ModalFooter>

                    </Modal>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Editar