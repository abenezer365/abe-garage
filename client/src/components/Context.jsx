import React,{ createContext,useReducer, useEffect } from "react";
import { InitialState, Reducer } from "../utils/reducer";
import { Type } from "../utils/action.type";
export const Context = createContext()

export const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, InitialState);
   useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);
  const toggleTheme = () => dispatch({ type: Type.TOGGLE_THEME });
    return(
        <Context.Provider value={{ state, dispatch, toggleTheme }}>
           {children}
        </Context.Provider>
    )
}