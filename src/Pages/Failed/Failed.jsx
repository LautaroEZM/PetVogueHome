import React from 'react';
import './Failed.module.css';

const Failed = () => {
  const handleRedirect = () => {
    window.location.replace('https://petvoguehome-production.up.railway.app');
  };

  return (
    <div className="failed-container">
      <p className="failed-message">Su compra no se pudo concretar, inténtelo nuevamente.</p>
      <button className="retry-button" onClick={handleRedirect}>Volver a la página</button>
    </div>
  );
};



export default Failed;
