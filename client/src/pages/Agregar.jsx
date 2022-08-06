import React, {useState,useEffect, useContext} from 'react'
import { Modal, ModalBody } from 'reactstrap';
import NavbarMobile from '../components/NavbarMobile';
import SpinnerLoading from '../components/SpinnerLoading';
// css
import '../styles/Agregar.scss';
// sweetAlert2 para alertas
import Swal from 'sweetalert2';
// axios
import axios from 'axios';
// context
import { DarkModes } from '../context/DarkMode';


// endpoint para añadir un equipo
const addEquipment = "https://registers-system-easy.herokuapp.com/registers/add";
// endpoint para obtener todos los equipos
const getAllEquipment = "https://registers-system-easy.herokuapp.com/registers/all";

// recibimos por props el name del usuario
const Agregar = ({name}) => {

    // context
    const {modeLocalStorage} = useContext(DarkModes)

    // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
    const [data, setData] = useState([]);

    // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
    const [modalInsertar, setModalInsertar]=useState(false);

    // HOOK USESTATE PARA CUANDO SELECCIONEMOS UN REGISTRO (SELECCIONAR UN DATA EN ESPECIFICO PARA LUEGO REALIZAR ALGUNA FUNCION)
    const [seleccionado, setSeleccionado] = useState({
        idproducto: '',
        categoria: '',
        descripcion: '',
        estado: '',
        serial: '',
        mac: '',
        fecha: '',
    })

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

    // SI MODALINSERTAR ES TRUE SE ABRE LA VENTANA MODAL 
    const abrirModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
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

    const peticionPost=async(e)=>{
        e.preventDefault()
        await axios.post(addEquipment, seleccionado)
        .then(response=>{
            setData(data.concat(response.data))
            abrirModalInsertar()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Equipo Agregado Correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        })
        setSeleccionado('')
    }
  
    useEffect(()=>{
        peticionGet();
    },[])


return(
    <>
    <div className='d-xxl-none navbarMobile'>
        <NavbarMobile name={name}/>
    </div>

    <div className={modeLocalStorage ? 'container-fluid mt-3 agregar' : 'container-fluid bg-dark text-light mt-3 agregar'}>
    <h1 className='text-center'>Agrega los equipos que desees!</h1>
    <div className="row">
        <div className='col'>
            <div className='p-1 table-div scroll'>
                <button onClick={()=>abrirModalInsertar()} className={modeLocalStorage ? "btn btn-sm btn-dark mb-5" : "btn btn-sm btn-secondary mb-5"}>Agregar Registro</button>
                    {data.length > 0 ? <table className={modeLocalStorage ? "table" : 'table table-dark'}>
                            <thead>
                                <tr className=''>
                                    {/* <th>Id De Registro</th> */}
                                    <th>Id</th>
                                    <th>Categoria/Nombre</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Serial</th>
                                    <th>Mac</th>
                                    <th>Fecha</th>
                                    <th>Cant Mantenimientos</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(registro=>{
                                    return(
                                        <tr className='text-uppercase' key={registro._id}>
                                            {/* <td>{registro._id}</td> */}
                                            <td>{registro.idproducto}</td>
                                            <td>{registro.categoria}</td>
                                            <td>{registro.descripcion}</td>
                                            <td>{registro.estado}</td>
                                            <td>{registro.serial}</td>
                                            <td>{registro.mac}</td>
                                            <td>{registro.fecha}</td>
                                            <td>{registro.mantenimientos.length}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : 
                    <SpinnerLoading/>}
                
                    <Modal isOpen={modalInsertar}>
                        <ModalBody>
                            <div className="form-group">
                                <h3>AGREGAR EQUIPO</h3>
                                    <form onSubmit={peticionPost}>
                                        <br/>
                                            <label>Id</label>
                                            <input onChange={handleChange} required className="form-control" type="number" min={1} name="idproducto" />
                                        <br/>
                                            <label>Categoria/Nombre</label>
                                            <input onChange={handleChange} required className="form-control" type="text" name="categoria" />
                                        <br/>
                                            <label>Descripción</label>
                                            <input onChange={handleChange} required className="form-control" type="text" name="descripcion" />
                                        <br/>
                                            <label>Estado</label>
                                            <input onChange={handleChange} required className="form-control" type="text" name="estado" />
                                        <br/>
                                            <label>Serial</label>
                                            <input onChange={handleChange} required className="form-control" type="number" min={1} name="serial" />
                                        <br/>
                                            <label>Mac</label>
                                            <input onChange={handleChange} required className="form-control" type="number" min={1} name="mac" />
                                        <br/>
                                            <label>Fecha</label>
                                            <input onChange={handleChange} required className="form-control" type="date" name="fecha" />
                                        <br/>
                                        <div className='flex bg-white justify-content-start'>
                                            <button type='submit' className="btn btn-success m-1">Insertar</button>
                                            <button className="btn btn-danger m-1" onClick={()=>abrirModalInsertar()}>Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
</>
)}

export default Agregar;