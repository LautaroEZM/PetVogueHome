import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import TopBarMenu from "./Components/topBar";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu></TopBarMenu>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Otras rutas pueden agregarse aquí según sea necesario */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
