import { useState } from 'react'
import './App.css'
import Login from "./screens/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/SideBar.jsx";

function App() {


  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<SideBar/> }></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
