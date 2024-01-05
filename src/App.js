import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import TopBarMenu from "./Components/topBar";
import CreatePet from "./Pages/CreatePet/CreatePet";
import Services from "./Pages/Services/Services";
import MyPets from "./Pages/MyPets/MyPets";
import CreateService from "./Pages/CreateService/CreateService";
import EditService from "./Pages/EditService/EditService";
import UserForm from "./Pages/CreateUser/CreateUser";
import DetailPet from "./Pages/DetailPet/DetailPet";
import DetailService from "./Pages/DetailService/DetailService";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crearMascota" element={<CreatePet />} />
            <Route path="/crearServicio" element={<CreateService />} />
            <Route path="/editarServicio/:id" element={<EditService />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/MisMascotas" element={<MyPets />} />
            <Route path="/detallesMascotas/:id" element={<DetailPet />} />
            <Route path="/detallesServicios/:id" element={<DetailService />} />
            <Route path="/crearUsuario" element={<UserForm/>} />
            {/* Otras rutas pueden agregarse aquí según sea necesario */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
