import React, {useState, useEffect, Fragment} from 'react';
import {  BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './landing/Landing';
import DashboardListar from './routesDashboard/DashboardListar';
import DashboardAgregar from './routesDashboard/DashboardAgregar';
import DashboardEditar from './routesDashboard/DashboardEditar';
import DashboardEliminar from './routesDashboard/DashboardEliminar';
import NotFound from './pages/NotFound';
import DashboardHome from './routesDashboard/DashboardHome';
import DashboardDetalles from './routesDashboard/DashboardDetalles';
// axios
import axios from 'axios';
// context
import {FindByIdProvider} from './context/FindById'; 
import {DarkModeProvider} from './context/DarkMode';
// css
import './styles/App.scss';

function App() {

  // state para el name del usuario 
  const [name, setName] = useState("Usuario");

  // obtenemos el token en el localtorage y lo guardamos en una constante
  const token = localStorage.getItem("token");

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
    }
    }, [ token]);





    return (
    <Fragment>
      <FindByIdProvider>
        <DarkModeProvider>
          <BrowserRouter>
            <Routes>

              <Route path="/" exact element={<Landing />}/>
              {/* privateRoute - dashboard */}
                <Route path="/dashboard/home" exact element={<DashboardHome name={name} />}/>
                <Route path="/dashboard/detalles" exact element={<DashboardDetalles name={name}/>}/>
                <Route path="/dashboard/listar" exact element={<DashboardListar name={name}/>}/>
                <Route path="/dashboard/agregar" exact element={<DashboardAgregar name={name}/>}/>
                <Route path="/dashboard/editar" exact element={<DashboardEditar name={name}/>}/>
                <Route path="/dashboard/eliminar" exact element={<DashboardEliminar name={name}/>}/>
              
              {/* page 404 - not found */}
              <Route path="*" exact element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </DarkModeProvider>
      </FindByIdProvider>
    </Fragment>
  );
}

export default App;
