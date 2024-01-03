import React, { useEffect } from 'react';
import {
  Drawer,
  Grid,
  Toolbar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { LinkNoDeco, YellowButton } from '../../styledComponents';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
} from '../../redux/actions';
import axios from 'axios';
import { Pets, Category, LocalHospital, Extension } from '@mui/icons-material';
import { Box } from '@mui/system';

const ServiciosAnimales = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchServicesRequest());
      try {
        const response = await axios.get('https://petvogue.onrender.com/Services');
        dispatch(fetchServicesSuccess(response.data));
      } catch (err) {
        dispatch(fetchServicesFailure(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const [filters, setFilters] = React.useState({
    mascota: ['Perros', 'Gatos'],
    general: ['Consulta', 'Cirugias', 'Especialidades', 'Vacunacion'],
    estetica: ['Peluqueria', 'Baños', 'Estetica general'],
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        padding: 2,
      }}
    >
      <Toolbar>
        <YellowButton onClick={toggleDrawer} sx={{ margin: '2px' }}>
          Filtros
        </YellowButton>
        <YellowButton sx={{ margin: '2px' }}>Ordenar</YellowButton>
        <LinkNoDeco to={'/crearServicio'}><YellowButton sx={{ margin: '2px' }}>
          Crear servicio
        </YellowButton></LinkNoDeco>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {[
            { category: 'MASCOTA', icon: <Pets />, options: filters.mascota },
            { category: 'GENERAL', icon: <Category />, options: filters.general },
            { category: 'ESTETICA', icon: <Extension />, options: filters.estetica },
          ].map(({ category, icon, options }) => (
            <div key={category}>
              <ListItem>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
              {options.map((option, index) => (
                <ListItem key={index}>
                  <Checkbox
                  // Aquí deberías manejar el estado de las opciones seleccionadas
                  />
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Drawer>

      <Grid container spacing={2} justifyContent="center">
        {services.map((servicio, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="serviceCard"
              sx={{
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 2,
                width: 300,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardHeader title={servicio.name} />
              <CardContent>
                <Typography>
                  <strong>Categoría:</strong> {servicio.category}
                </Typography>
              {/*🎀Agregado para que se vea image, despues modificar en todo caso */}
              <Typography>
               <strong></strong> 
                <img src={servicio.image} alt={servicio.name} style={{width: '100%'}}/>
                 </Typography>
                 {/*🎀Hasta aca*/}
                <Typography>
                  <strong>Precio:</strong> {servicio.price}
                </Typography>
                <div sx={{ paddingTop: 2 }}>
                  <Typography>{servicio.description}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiciosAnimales;
