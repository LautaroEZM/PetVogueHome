import React, { useState } from 'react';
import styles from './Services.module.css'; // Importa tus estilos CSS

const ServiciosAnimales = () => {
  const servicios = [
    {
      nombre: 'Castración',
      descripcion: 'Procedimiento quirúrgico para esterilizar a mascotas, evitando la reproducción no deseada.',
      categoria: 'Cirugía',
      precio: 'Variable'
    },
    {
      nombre: 'Corte de Pelo y Baño',
      descripcion: 'Servicio de cuidado estético que incluye corte de pelo, baño, y cuidado de uñas.',
      categoria: 'Peluquería y cuidado',
      precio: 'Variable'
    },
    {
      nombre: 'Vacunación Anual',
      descripcion: 'Administración de vacunas esenciales para prevenir enfermedades comunes en mascotas.',
      categoria: 'Servicio preventivo',
      precio: 'Variable'
    },
    {
      nombre: 'Consulta Veterinaria General',
      descripcion: 'Examen físico y evaluación general de la salud de la mascota.',
      categoria: 'Consulta veterinaria',
      precio: 'Variable'
    },
    {
      nombre: 'Desparasitación',
      descripcion: 'Tratamiento para eliminar parásitos internos y externos.',
      categoria: 'Cuidado preventivo',
      precio: 'Variable'
    },
    {
      nombre: 'Radiografías Diagnósticas',
      descripcion: 'Realización de radiografías para diagnosticar problemas de salud específicos.',
      categoria: 'Diagnóstico por imagen',
      precio: 'Variable'
    },
    {
      nombre: 'Cirugía Dental',
      descripcion: 'Procedimiento para el cuidado dental, que puede incluir limpieza y extracción de dientes.',
      categoria: 'Cirugía dental',
      precio: 'Variable'
    },
    {
      nombre: 'Hospitalización y Cuidados Intensivos',
      descripcion: 'Servicio para el tratamiento y cuidado de mascotas que requieren hospitalización.',
      categoria: 'Cuidado especializado',
      precio: 'Variable'
    },
    {
      nombre: 'Microchip de Identificación',
      descripcion: 'Colocación de un microchip para identificar y localizar a la mascota en caso de pérdida.',
      categoria: 'Identificación y seguridad',
      precio: 'Variable'
    },
    {
      nombre: 'Programa de Control de Peso',
      descripcion: 'Plan de control de peso que incluye dieta y seguimiento regular.',
      categoria: 'Servicio de bienestar',
      precio: 'Variable'
    }
  ];

  const [expandedService, setExpandedService] = useState(null);

  const handleServiceClick = (index) => {
    if (expandedService === index) {
      setExpandedService(null); // Contraer si se hace clic en la tarjeta expandida
    } else {
      setExpandedService(index); // Expandir la tarjeta seleccionada
    }
  };

  return (
    <div className={styles.servicesContainer}>
      {servicios.map((servicio, index) => (
        <div
          key={index}
          className={`${styles.serviceCard} ${expandedService === index ? styles.expanded : ''}`}
          onClick={() => handleServiceClick(index)}
        >
          <div className={styles.serviceHeader}>
            <h2>{servicio.nombre}</h2>
            <p><strong>Categoría:</strong> {servicio.categoria}</p>
            <p><strong>Precio:</strong> {servicio.precio}</p>
          </div>
          {expandedService === index && (
            <div className={styles.serviceDescription}>
              <p>{servicio.descripcion}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiciosAnimales;