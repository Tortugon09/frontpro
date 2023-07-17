import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../context/context.jsx";

export const Protected = ({children}) => {
    const {login,token, setUserR,userR,setOpen} = useContext(Context);

    if (!token) {
        return <Navigate to={"/"}/>
    }
    return children
}