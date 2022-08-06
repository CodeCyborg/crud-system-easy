import React, {useState,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMobile from '../components/NavbarMobile';
import SpinnerLoading from '../components/SpinnerLoading';
// css
import '../styles/Listado.scss';
// axios
import axios from 'axios';
// librerias para exportar pdf y excel
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
// context
import { FindById } from '../context/FindById';
import { DarkModes } from '../context/DarkMode';
// endpoint para obtener todos los datos
const getAllEquipment = "https://registers-system-easy.herokuapp.com/registers/all";

const Listado = ({name}) => {

  // context
  const {modeLocalStorage} = useContext(DarkModes);
  const {setContextData} = useContext(FindById);


  //definimos el hook useNavigate en una constante
  const navigate = useNavigate()


  // funcion para obtener el registro al que le queremos ver los detalles
  const registroSeleccionado=(registro)=>{
    navigate('/dashboard/detalles')
    setContextData(registro)
  }

  // USAMOS EL HOOK USESTATE PARA TRAER LA DATA Y REALIZAR LAS DIFERENTES OPERACIONES EN EL FRONT
  const [data, setData] = useState([]);

  // PETICIONES
  const peticionGet=()=>{
    setTimeout(() => {
      axios.get(getAllEquipment)
      .then(response=>{
        setData(response.data)
      })
      .catch((error)=> console.log(error))
    }, 150)
  }

  useEffect(()=>{
    peticionGet();
  },[])

  // Filtrado state
  const [filtrarFecha, setFiltrarFecha] = useState("");

  // funcion para capturar fecha y cambiar state
  const filtradorFecha = (e) =>{
    setFiltrarFecha(e.target.value)
  }

  // metodo de filtrado
  let resultadosFiltrados = [];

  // si filtrarFecha es diferente a: "" , 'no sucede nada' (el array sera igual a la data oficial)
  if(!filtrarFecha){
    resultadosFiltrados = data;
  }else{
    // si no , será modificado el array y sera filtrado por la fecha que este en el state (El método includes determina si una cadena de texto puede ser encontrada dentro de otra cadena de texto, devolviendo true o false según cor)
    resultadosFiltrados = data.filter((registro)=>
      registro.fecha.toLowerCase().includes(filtrarFecha.toLocaleLowerCase())
    )
  }



  // para exportar a pdf
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "LISTADO DE REGISTROS";
    const headers = [["ID DE PRODUCTO", "CATEGORIA", "DESCRIPCION", "SERIAL", "MAC", "FECHA", "CANT MANTENIMIENTOS"]];

    const datos = resultadosFiltrados.map(item => [item.idproducto, item.categoria, item.descripcion, item.serial, item.mac, item.fecha, item.mantenimientos.length]);

    let content = {
      startY: 100,
      head: headers,
      body: datos
    };

    doc.text(title, marginLeft, 50);
    doc.autoTable(content);
    doc.save("listado.pdf")
  }

  

  return (
    <> 
    <div className='d-xxl-none navbarMobile'>
      <NavbarMobile name={name}/>
    </div>
    <div className={modeLocalStorage ? 'container-fluid mt-3 listado' : 'container-fluid mt-3 listado-dark text-white'}>
    <h1 className='text-center'>Aqui econtrarás el listado de tus equipos!</h1>
    <div className="row">
      <div className='col'>
        <div className='p-1 table-div scroll'>
          <div className='d-flex align-items-center justify-content-between'>
            <div>
              {/* para exportar a excel */}
              <button onClick={()=> exportPDF()} className='btn btn-sm btn-dark m-2'>Generar PDF</button>
              <ReactHTMLTableToExcel 
                className="btn btn-sm btn-dark m-2"
                table="table"
                filename="listado-de-registros"
                sheet="Sheet"
                buttonText="Generar Excel"
              />
            </div>
            <div className='d-flex align-items-center'>
              <span className='m-1'>Filtrar</span>
              <input value={filtrarFecha} onChange={filtradorFecha} type='date' className={modeLocalStorage ? "form-control" : 'form-control bg-dark text-light'} />
            </div>
          </div>
          {data.length > 0 ? <table id='table' className={modeLocalStorage ? "table mt-5" : 'table table-dark mt-5'}>
                    <thead>
                        <tr className=''>
                            <th>Id</th>
                            <th>Categoria o Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Serial</th>
                            <th>Mac</th>
                            <th>Fecha</th>
                            <th>Cant Mantenimientos</th>
                            <th>Acciónes</th>
                        </tr>
                    </thead>

                <tbody>
                    {resultadosFiltrados.map(registro=>{
                        return(
                        <tr className='text-uppercase' key={registro._id}>
                          <td>{registro.idproducto}</td>
                          <td>{registro.categoria}</td>
                          <td>{registro.descripcion}</td>
                          <td>{registro.estado}</td>
                          <td>{registro.serial}</td>
                          <td>{registro.mac}</td>
                          <td>{registro.fecha}</td>
                          <td>{registro.mantenimientos.length}</td>
                          <td>
                              <button onClick={()=>registroSeleccionado(registro)} className={modeLocalStorage ? 'btn btn-sm btn-dark' : 'btn btn-sm btn-secondary'}>Detalles</button>
                          </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table> : <SpinnerLoading/>}
        </div>
    </div>
    </div>
</div>
</>
  )
}

export default Listado;