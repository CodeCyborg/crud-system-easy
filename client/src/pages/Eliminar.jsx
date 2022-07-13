import React, {useState, useEffect, useContext} from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { AiFillDelete } from 'react-icons/ai'
import NavbarMobile from '../components/NavbarMobile';
import SpinnerLoading from '../components/SpinnerLoading';
// css
import '../styles/Eliminar.scss';
// sweetAlert2 para alertas
import Swal from 'sweetalert2';
// axios
import axios from 'axios';
// context
import { DarkModes } from '../context/DarkMode';

// para obtener todos los datos
const getAllEquipment = "http://localhost:8080/registers/all";
// para eliminar un dato
const deleteEquipment = "http://localhost:8080/registers/delete/";

const Eliminar = ({name}) => {

  // context
  const {modeLocalStorage} = useContext(DarkModes)

  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
   const [data, setData] = useState([]);

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
   const [modalEliminar, setModalEliminar]=useState(false);

  //modal
  const abrirModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  
  // HOOK USESTATE PARA CUANDO SELECCIONEMOS UN REGISTRO (SELECCIONAR UN DATA EN ESPECIFICO PARA LUEGO REALIZAR ALGUNA FUNCION)
  const [seleccionado, setSeleccionado] = useState({
    idproducto: '',
    categoria: '',
    descripcion: '',
    serial: '',
    mac: '',
    fecha: ''
  })

  const registroSeleccionado=(registro, caso)=>{
    setSeleccionado(registro);
    (caso === "Eliminar")&&abrirModalEliminar();
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

  const peticionDelete=async()=>{
    await axios.delete(deleteEquipment+seleccionado._id)
    .then(response=>{
      setData(data.filter(registro=>registro._id!==seleccionado._id));
      abrirModalEliminar();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Equipo Eliminado Correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
    
  useEffect(()=>{
    peticionGet();
  },[])


return(
  <>
    <div className='d-xxl-none navbarMobile'>
      <NavbarMobile name={name}/>
    </div>
    <div className={modeLocalStorage ? 'container-fluid mt-3 eliminar' : 'container-fluid bg-dark text-light mt-3 eliminar'}>
      <h1 className='text-center'>Aqui podrás eliminar un equipo, ten cuidado!</h1>
        <div className="row">
            <div className='col'>
                <div className='p-1 table-div scroll'>
                {data.length > 0 ? <table className={modeLocalStorage ? "table" : 'table table-dark'}>
                      <thead>
                          <tr className=''>
                            {/* <th scope="col">Id De Registro</th> */}
                            <th scope="col">Acciones</th>
                            <th scope="col">Idto</th>
                            <th scope="col">Categoria/Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Mac</th>
                            <th scope="col">Fecha</th>
                          </tr>
                      </thead>

                    <tbody>
                        {data.map(registro=>{
                            return(
                              <tr className='text-uppercase' key={registro._id}>
                                {/* <th scope="row">{registro._id}</th> */}
                                <td>
                                  <button onClick={()=>registroSeleccionado(registro, "Eliminar")} className="btn btn-sm btn-danger"><AiFillDelete/></button>
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
                  
            
                <Modal isOpen={modalEliminar}>
                      {/* <ModalHeader style={{display: "block"}}>
                            <span style={{float: "right"}}>X</span>
                        </ModalHeader> */}
                      <ModalBody>
                          <div className="form-group">
                          <p>¿ESTÁS SEGURO QUE QUIERES ELIMINAR EL EQUIPO?</p>
                          </div>
                      </ModalBody>

                      <ModalFooter>
                          <button className="btn btn-danger" onClick={()=>peticionDelete()}>Confirmar</button>
                          <button className="btn btn-warning" onClick={()=>abrirModalEliminar()}>Cancelar</button>
                      </ModalFooter>

                    </Modal>
                </div>
            </div>
        </div>
    </div>
  </>
)}

export default Eliminar