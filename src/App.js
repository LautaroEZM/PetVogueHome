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
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// import UserForm from "./Pages/CreateUser/CreateUser";
import DetailPet from "./Pages/DetailPet/DetailPet";
import DetailService from "./Pages/DetailService/DetailService";
import Perfil from "./Pages/Perfil/Perfil";
import Products from "./Pages/Products/Products";
import DetailProduct from "./Pages/DetailProduct/DetailProduct";
import NotLoggedInRoutes from "./utils/NotLoggedInRoutes";
import LoggedInRoutes from "./utils/LoggedInRoutes";
import Failed from './Pages/Failed/Failed';

// import Login from "./Pages/LoginGoogle/LoginGoogle";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="*" element={<>NOT FOUND</>} />
            <Route path="/crearMascota" element={<CreatePet />} />
            <Route path="/crearServicio" element={<CreateService />} />
            <Route path="/editarServicio/:id" element={<EditService />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/detallesMascotas/:id" element={<DetailPet />} />
            <Route path="/detallesServicios/:id" element={<DetailService />} />
            <Route path="/detallesProductos/:id" element={<DetailProduct />} />
            <Route element={<LoggedInRoutes />}>
              <Route path="/ingresar" element={<Login />} />
              <Route path="/registrarse" element={<Register />} />
            </Route>
            <Route element={<NotLoggedInRoutes />}>
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/MisMascotas" element={<MyPets />} />
            </Route>
            <Route path="/failed" element={<Failed />} />
            {/* Otras rutas pueden agregarse aquí según sea necesario */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
