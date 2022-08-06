import React, {useContext, useEffect, useState} from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavbarMobile from '../components/NavbarMobile';
// axios
import axios from 'axios';
// css
import '../styles/Listado.scss';
// sweetAlert2 para alertas
import Swal from 'sweetalert2';
// img
import noDataPng from '../utils/png/undraw_teaching_re_g7e3.svg';
// libreria para animaciones
import LightSpeed from "react-reveal/Roll";
// context
import { FindById } from '../context/FindById';
import { DarkModes } from '../context/DarkMode';


const Detalles = ({name}) => {

  // context
  const {modeLocalStorage} = useContext(DarkModes)
  const {contextData} = useContext(FindById);
  
  // para obtener los mantenimientos existentes
  const getMantenimientos = `https://registers-system-easy.herokuapp.com/registers/all/maintenance/${contextData._id}`;
  // para añadir un mantenimineto
  const addMantenimiento = `https://registers-system-easy.herokuapp.com/registers/add/maintenance/${contextData._id}`;
  // para editar un mantenimineto (seleccionado id)
  const updateMantenimiento = 'https://registers-system-easy.herokuapp.com/registers/update/maintenance/';
  // para eliminar un mantenimineto
  const deleteMantenimiento = `https://registers-system-easy.herokuapp.com/registers/delete/maintenance/`;


  const [data, setData] = useState([]);

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
  const [modalInsertar, setModalInsertar]=useState(false);

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL
  const [modalEliminar, setModalEliminar]=useState(false);

  // USAMOS EL HOOK USESTATE PARA MANIPULAR LA VENTANA MODAL 
  const [modalEditar, setModalEditar]=useState(false);

  // state para el registro seleccionado
  const [seleccionado, setSeleccionado] = useState({
    fecha: '',
    tipo_mantenimiento: '',
    descripcion: '',
    estado: '',
    costo: '',
    responsable: '',
    entidad: '',
    proximo: '',
  })

  // SI MODALINSERTAR ES TRUE SE ABRE LA VENTANA MODAL 
  const abrirModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
    
  const abrirModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirModalEditar=()=>{
    setModalEditar(!modalEditar);
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

  //PETICIONES
  const peticionGetMantenimiento=()=>{
    setTimeout(() => {
      if(contextData.idproducto > 0){
        axios.get(getMantenimientos)
        .then(response=>{
          setData(response.data.mantenimientos)
        })
      }
    }, 150)
  }

  useEffect(()=>{
    peticionGetMantenimiento();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const peticionPostMantenimiento=async()=>{
    await axios.post(addMantenimiento, seleccionado)
    .then(response=>{
        setData(data.concat(response.data))
        abrirModalInsertar()
        setSeleccionado('')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mantenimiento Agregado',
          showConfirmButton: false,
          timer: 1500
        })
    })
    peticionGetMantenimiento()
  }

  const peticionDeleteMantenimiento=async()=>{
    await axios.delete(deleteMantenimiento+seleccionado._id)
    .then(()=>{
      setData(data.filter(mantenimiento=>mantenimiento._id!==seleccionado._id));
      abrirModalEliminar();
      setSeleccionado('')
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Mantenimiento Eliminado',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const peticionPutMantenimiento=async()=>{
    await axios.put(updateMantenimiento+seleccionado._id, seleccionado)
    .then(()=>{
      let dataNueva=data;
      // eslint-disable-next-line array-callback-return
      dataNueva.map(mantenimiento =>{
        if(seleccionado._id===mantenimiento._id){
          mantenimiento.fecha=seleccionado.fecha;
          mantenimiento.tipo_mantenimiento=seleccionado.tipo_mantenimiento;
          mantenimiento.descripcion=seleccionado.descripcion;
          mantenimiento.costo=seleccionado.costo;
          mantenimiento.responsable=seleccionado.responsable;
          mantenimiento.entidad=seleccionado.entidad;
          mantenimiento.proximo=seleccionado.proximo;
        }
        setSeleccionado('')
      })
      setData(dataNueva);
      abrirModalEditar();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Mantenimiento Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
    }

    )
  }

  const MantenimientoSeleccionado=(mantenimiento, caso)=>{
    setSeleccionado(mantenimiento);
    (caso === "Eliminar")&&abrirModalEliminar();
    (caso === "Editar"&&abrirModalEditar());
  }



return (
    <> 
    <div className='d-xxl-none navbarMobile'>
      <NavbarMobile name={name}/>
    </div>
    <div className={modeLocalStorage ? 'container-fluid mt-3 listado' : 'container-fluid mt-3 listado bg-dark text-light'}>
    <h1 className='text-center'>Detalles de tus equipos!</h1>
    <div className="row">
      <div className='col'>
        <div className='p-1 table-div scroll'>
          <div className='d-flex align-items-center justify-content-between'>
          </div>
          {contextData.idproducto > 0 ? <div className='mt-2'>
          <h3>Equipo</h3>
            <table id='table' className={modeLocalStorage ? "table" : 'table table-dark'}>
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
                        </tr>
                    </thead>

                <tbody>
                      <tr className='text-uppercase' >
                        {/* <td>{registro._id}</td> */}
                        <td>{contextData.idproducto}</td>
                        <td>{contextData.categoria}</td>
                        <td>{contextData.descripcion}</td>
                        <td>{contextData.estado}</td>
                        <td>{contextData.serial}</td>
                        <td>{contextData.mac}</td>
                        <td>{contextData.fecha}</td>
                      </tr>
                </tbody>
            </table> 

              <div className='d-flex'>
                <h3 className='m-1'>Mantenimientos</h3><button onClick={()=>abrirModalInsertar()} className={modeLocalStorage ? 'btn m-1 btn-dark btn-sm' : 'btn m-1 btn-secondary btn-sm'}>Agregar</button>
              </div>
            <table id='table' className={modeLocalStorage ? "table" : 'table table-dark'}>
                    <thead>
                        <tr className='text-dark'>
                            {/* <th>Id De Registro</th> */}
                            <th>Fecha</th>
                            <th>Tipo de mantenimiento</th>
                            <th>Descripción</th>
                            <th>Costo</th>
                            <th>Responsable</th>
                            <th>Entidad</th>
                            <th>Proximo Mantenimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                <tbody>
                {data.map(mantenimiento=>{
                        return(
                        <tr className='text-uppercase' key={mantenimiento._id}>
                          {/* <td>{mantenimiento._id}</td> */}
                          <td>{mantenimiento.fecha}</td>
                          <td>{mantenimiento.tipo_mantenimiento}</td>
                          <td>{mantenimiento.descripcion}</td>
                          <td>{mantenimiento.costo}</td>
                          <td>{mantenimiento.responsable}</td>
                          <td>{mantenimiento.entidad}</td>
                          <td>{mantenimiento.proximo}</td>
                          <td>
                            <button onClick={()=>MantenimientoSeleccionado(mantenimiento, "Editar")} className={modeLocalStorage ? 'btn btn-sm btn-dark m-1' : 'btn btn-sm btn-secondary m-1'}>Editar</button>
                            <button onClick={()=>MantenimientoSeleccionado(mantenimiento, "Eliminar")} className={modeLocalStorage ? 'btn btn-sm btn-dark m-1' : 'btn btn-sm btn-secondary m-1'}>Eliminar</button>
                          </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table> 
            </div>
            :   <div>
                  <h2>Escoje el registro al que le quieras ver sus detalles, dirigete a listado!.</h2>
                  <LightSpeed left>
                    <img className='mt-4' src={noDataPng} alt='sorry' width={800} height={500}/>
                  </LightSpeed>
                </div>}

        </div>
    </div>
    </div>
</div>




<Modal isOpen={modalInsertar}>
    {/* <ModalHeader style={{display: "block"}}>
          <span style={{float: "right"}}>X</span>
    </ModalHeader> */}

    <ModalBody>
        <div className="form-group">
          <h3>AGREGAR EQUIPO</h3>
          <form>
          <br/>
              <label>Fecha</label>
              <input onChange={handleChange} required className="form-control" type="date" name="fecha" />
          <br/>
              <label>Tipo De Mantenimiento</label>
              <input onChange={handleChange} required className="form-control" type="text" name="tipo_mantenimiento" />
          <br/>
              <label>Descripción</label>
              <input onChange={handleChange} required className="form-control" type="text" name="descripcion" />
          <br/>
              <label>Costo $</label>
              <input onChange={handleChange} required className="form-control" type="text" name="costo" />
          <br/>
              <label>Responsable</label>
              <input onChange={handleChange} required className="form-control" type="text" name="responsable" />
          <br/>
              <label>Entidad</label>
              <input onChange={handleChange} required className="form-control" type="text" name="entidad" />
          <br/>
              <label>Proximo</label>
              <input onChange={handleChange} required className="form-control" type="date" name="proximo" />
          <br/>
          </form>
      </div>
    </ModalBody>

    <ModalFooter>
          <button type='submit' className="btn btn-dark" onClick={()=>peticionPostMantenimiento()}>Insertar</button>
          <button className="btn btn-danger" onClick={()=>abrirModalInsertar()}>Cancelar</button>
    </ModalFooter>                   
</Modal>



<Modal isOpen={modalEliminar}>
  {/* <ModalHeader style={{display: "block"}}>
        <span style={{float: "right"}}>X</span>
    </ModalHeader> */}
  <ModalBody>
      <div className="form-group">
      <p>¿ESTÁS SEGURO QUE DESEAS ELIMINAR EL MANTENIMIENTO?</p>
      </div>
  </ModalBody>

  <ModalFooter>
      <button className="btn btn-danger" onClick={()=>peticionDeleteMantenimiento()}>Confirmar</button>
      <button className="btn btn-dark" onClick={()=>abrirModalEliminar()}>Cancelar</button>
  </ModalFooter>

</Modal>




<Modal isOpen={modalEditar}>
{/* <ModalHeader style={{display: "block"}}>
    <span style={{float: "right"}}>X</span>
</ModalHeader> */}
<ModalBody>
  <div className="form-group">
      <h3>EDITAR MANTENIMIENTO</h3>
      <br/>
      <label>Editar Fecha</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.fecha} name="fecha" className="form-control" type="date"/>
      <br/>
      <label>Editar Tipo De Mantenimiento</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.tipo_mantenimiento} name="tipo_mantenimiento" className="form-control" type="text"/>
      <br/>
      <label>Editar Descripción</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.descripcion} name="descripcion" className="form-control" type="text"/>
      <br/>
      <label>Editar Costo</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.costo} name="costo" className="form-control" type="text"/>
      <br/>
      <label>Editar Responsable</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.responsable} name="responsable" className="form-control" type="text" />
      <br/>
      <label>Editar Entidad</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.entidad} name="entidad" className="form-control" type="text" />
      <br/>
      <label>Editar Proximo</label>
        <input onChange={handleChange} value={seleccionado && seleccionado.proximo} name="proximo" className="form-control" type="date" />
    <br/>
  </div>
</ModalBody>

  <ModalFooter>
    <button className="btn btn-dark" onClick={()=>peticionPutMantenimiento()}>Editar</button>
    <button className="btn btn-danger" onClick={()=>abrirModalEditar()}>Cancelar</button>
  </ModalFooter>

</Modal>
</>

)}

export default Detalles;