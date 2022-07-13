import { useState } from "react";

import { createContext } from "react";

export const DarkModes = createContext();

export function DarkModeProvider(props){
    
    const [modeLocalStorage, setModeLocalStorage] = useState(true);

    const darkModeToogle = ()=>{
        setModeLocalStorage(!modeLocalStorage)
        if(modeLocalStorage){
          localStorage.setItem('modes', 'dark');
        }else{
          localStorage.removeItem('modes');
        }
      }

    const setMode = {modeLocalStorage, setModeLocalStorage, darkModeToogle};

    return(
        <DarkModes.Provider value={setMode}>
            {props.children}
        </DarkModes.Provider>
    )
}