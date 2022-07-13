import {useState} from 'react';

import { createContext } from "react";

export const FindById = createContext();

export function FindByIdProvider(props){
    const [contextData, setContextData] = useState({
        _id: '0',
        idproducto: '0',
        categoria: 'ninguno',
        descripcion: 'ninguno',
        serial: '0',
        mac: '0',
        fecha: 'ninguno',
        mantenimientos: [{
            
        }]
      })

    const id = {contextData, setContextData};

    return(
        <FindById.Provider value={id}>
            {props.children}
        </FindById.Provider>
    )
}
