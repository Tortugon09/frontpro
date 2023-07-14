import { useState } from 'react'
import './App.css'
import Login from "./screens/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/SideBar.jsx";
import Register from "./screens/Register.jsx";
import {ContexProvider} from "./context/context.jsx";

function App() {


  return (
    <>

            <BrowserRouter>
                <ContexProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/home" element={<SideBar/> }></Route>
                    </Routes>
                </ContexProvider>
            </BrowserRouter>

    </>
  )
}

export default App
