import React, { useEffect, useState, useContext } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import NavbarMobile from "../NavbarMobile";
import { IoStatsChartSharp } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
// context
import { DarkModes } from '../../context/DarkMode';
// css
import "../../styles/Home.scss";
// libreria de js para graficos
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const Home = ({ name }) => {

  // context  
  const {modeLocalStorage} = useContext(DarkModes);

  const [equiposTotal, setEquiposTotal] = useState(0);
  const [mantenimientosTotal, setMantenimientosTotal] = useState(0);

  // El método reduce recorre el array y llama a la función reductora para almacenar el valor del cálculo del array (va almacenando los datos de izquierda a derecha y realiza una acumulacion).
  const reducer = (a, b) => a + b;
  
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
    labels: ["Red", "Yellow", "Blue"],
  });

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8080/registers/all")
        .then((data) => {
          const res = data.json();
          return res;
        })
        .then((res) => {
          const data = [];
          const labels = [];
          for (let i of res) {
            data.push(i.mantenimientos.length);
            labels.push(i.categoria);
          }
          setMantenimientosTotal(data.reduce(reducer))
          setEquiposTotal(data.length);
          setData({
            datasets: [
              {
                data: data,
                backgroundColor: ["#00B89F", "blue", "#00E3FA", "white"],
                borderColor: ["#232323"],
              },
            ],
            labels: labels,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="d-xxl-none navbarMobile">
        <NavbarMobile name={name}/>
      </div>
      <Header name={name} />
      <div className="p-5">
        {/* <div className=''> */}
          <div className="row d-flex justify-content-around w-100">

          <div className="col-md-3">
              <div className={modeLocalStorage ? "card bg-light mb-5" : 'card bg-dark text-light mb-5'}>
                <div className="card-header text-center">
                  EQUIPOS TOTALES
                </div>
                <div className="card-body d-flex justify-content-evenly">
                  <h1 className="card-text">{equiposTotal}</h1>
                  <h1>
                    <IoStatsChartSharp />
                  </h1>
                </div>
              </div>

              <div className={modeLocalStorage ? "card bg-light mb-3" : 'card bg-dark text-light mb-3'}>
                <div className="card-header text-center">
                  MANTENIMIENTOS TOTALES
                </div>
                <div className="card-body d-flex justify-content-evenly">
                  <h1 className="card-text">{mantenimientosTotal}</h1>
                  <h1>
                    <IoStatsChartSharp />
                  </h1>
                </div>
              </div>
            </div>

            <div className={modeLocalStorage ? "col-md-3 bg-white rounded" : "col-md-3 bg-dark rounded"}>
              <h5 className={modeLocalStorage ? "text-dark text-center" : "text-light text-center"}>Mantenimientos</h5>
              <Pie className="m-2" data={data} />
            </div>
            <div className="col-md-3">
            <div className={modeLocalStorage ? "card h-100 w-100 bg-light rounded m-2" : 'card h-100 w-100 bg-dark text-light rounded m-2'}>
                <div className="card-header text-center">
                  Info <BsInfoSquare/>
                </div>
                <div className="card-body d-flex flex-column justify-content-evenly">
                  <div className="d-flex justify-content-between">
                    <label>Version:</label>
                    <h6 className="card-text">Demo 0.1</h6>
                  </div>
                  <hr/>
                  <div className="d-flex justify-content-between">
                    <label>Released:</label>
                    <h6 className="card-text">Demo 0.1</h6>
                  </div>
                  <hr/>
                  <div className="d-flex justify-content-between">
                    <label>Theme Version:</label>
                    <h6 className="card-text">Demo 0.1</h6>
                  </div>
                  <hr/>
                  <div className="d-flex justify-content-between">
                    <label>Date Upload:</label>
                    <h6 className="card-text">Demo 0.1</h6>
                  </div>
                  <hr/>
                  
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
