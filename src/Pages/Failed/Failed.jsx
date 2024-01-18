import React from 'react';
import './Failed.module.css';  // Importa el archivo CSS

const Failed = () => {
  const handleRedirect = () => {
    // Redireccionar manualmente al hacer clic en el botón
    window.location.replace('https://petvoguehome-production.up.railway.app');
  };

  return (
    <div className="failed-container"> {/* Agrega una clase contenedora */}
      <p className="failed-message">Su compra no se pudo concretar, inténtelo nuevamente.</p>
      <button className="retry-button" onClick={handleRedirect}>Volver a la página</button>
    </div>
  );
};



export default Failed;
