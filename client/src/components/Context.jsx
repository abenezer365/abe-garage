import React,{ createContext,useReducer, useEffect } from "react";
import { InitialState, Reducer } from "../utils/reducer";
import { Type } from "../utils/action.type";
import axios from "../utils/axios.instance";

export const Context = createContext()

export const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, InitialState);

    //Theme toggler in every change in theme
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', state.theme);
      }, [state.theme]);

      //Auto login in page reload
    useEffect(() => {
      async function checkUser() {
        const token = localStorage.getItem("token");

          if (!token) {
            dispatch({ type: Type.SET_USER, user: null });
            return;
          }

          try {
            const res = await axios.get("/user/check", {
              headers: { Authorization: `Bearer ${token}` },
            });   
                //AUTO-LOGIN
            if (res.data.success) {
              dispatch({
                type: Type.SET_USER,
                user: res.data.user});
            } else {
              // So Here if the Token is invalid, We Will clear localStorage
              localStorage.removeItem("token");
              dispatch({ type: Type.SET_USER, user: null });
            }
          } catch (error) {
            // Clearing localStorage on auth failure
            localStorage.removeItem("token");
            dispatch({ type: Type.SET_USER, user: null });
          }
         };
        checkUser();
      }, []);

    return(
        <Context.Provider value={{ state, dispatch}}>
           {children}
        </Context.Provider>
    )
}