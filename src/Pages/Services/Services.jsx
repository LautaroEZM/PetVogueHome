import React, { useState } from 'react';
import {
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Category, Pets, Extension } from '@mui/icons-material';
import styles from './Services.module.css';
import { YellowButton } from '../../styledComponents';

const ServiciosAnimales = () => {
  const servicios = [
    // Tu lista de servicios
  ];

  const [expandedService, setExpandedService] = useState(null);
  const [filters, setFilters] = useState({ animal: [], especialidad: [], otros: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleServiceClick = (index) => {
    if (expandedService === index) {
      setExpandedService(null);
    } else {
      setExpandedService(index);
    }
  };

  const handleFilterToggle = (category, option) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const categoryFilters = newFilters[category];

      if (categoryFilters.includes(option)) {
        // Remove option if already selected
        newFilters[category] = categoryFilters.filter((item) => item !== option);
      } else {
        // Add option if not selected
        newFilters[category] = [...categoryFilters, option];
      }

      return newFilters;
    });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={styles.servicesContainer}>
      <Toolbar>
        <YellowButton onClick={toggleDrawer} sx={{
          margin: "2px"
        }}>Filtros</YellowButton>
        <YellowButton sx={{
          margin: "2px"
        }}>Ordenar</YellowButton>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {[
            { category: 'animal', icon: <Pets />, options: ['Perros', 'Gatos'] },
            { category: 'especialidad', icon: <Category />, options: ['Cirugia', 'Radiografias', 'Analisis'] },
            { category: 'otros', icon: <Extension />, options: ['Peluqueria', 'Vacunacion', 'Consulta'] },
          ].map(({ category, icon, options }) => (
            <div key={category}>
              <ListItem>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={category.toUpperCase()} />
              </ListItem>
              {options.map((option, index) => (
                <ListItem key={index}>
                  <Checkbox
                    checked={filters[category].includes(option)}
                    onChange={() => handleFilterToggle(category, option)}
                  />
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Drawer>

      {servicios.map((servicio, index) => (
        <div
          key={index}
          className={`${styles.serviceCard} ${expandedService === index ? styles.expanded : ''}`}
          onClick={() => handleServiceClick(index)}
        >
          <div className={styles.serviceHeader}>
            <h2>{servicio.nombre}</h2>
            <p>
              <strong>Categoría:</strong> {servicio.categoria}
            </p>
            <p>
              <strong>Precio:</strong> {servicio.precio}
            </p>
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
