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
import { Pets, Category, Extension } from '@mui/icons-material';
import { Box } from '@mui/system';


const ServiciosAnimales = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchServicesRequest());
      try {
        const response = await axios.post('https://petvogue.onrender.com/services/get');
        dispatch(fetchServicesSuccess(response.data.rows)); // Asegúrate de acceder correctamente a los datos
      } catch (err) {
        dispatch(fetchServicesFailure(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const [filters, setFilters] = React.useState({
    mascota: ['Perro', 'Gato'],
    general: ['Consulta', 'Cirugias', 'Especialidades', 'Vacunacion'],
    estetica: ['Peluqueria', 'Baños', 'Estetica general'],
  });

  const [sort, setSort] = React.useState('none');

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [selectedPets, setSelectedPets] = React.useState([]);
  const [selectedServices, setSelectedServices] = React.useState([]);

  const handlePetCheckboxChange = (pet) => {
    const newSelectedPets = [...selectedPets];
    const petIndex = newSelectedPets.indexOf(pet);

    if (petIndex === -1) {
      newSelectedPets.push(pet);
    } else {
      newSelectedPets.splice(petIndex, 1);
    }

    setSelectedPets(newSelectedPets);
    applyFilters(newSelectedPets, selectedServices);
  };

  const handleServiceCheckboxChange = (service) => {
    const newSelectedServices = [...selectedServices];
    const serviceIndex = newSelectedServices.indexOf(service);

    if (serviceIndex === -1) {
      newSelectedServices.push(service);
    } else {
      newSelectedServices.splice(serviceIndex, 1);
    }

    setSelectedServices(newSelectedServices);
    applyFilters(selectedPets, newSelectedServices);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSort = () => {
    setSort(sort === 'none' ? 'asc' : sort === "asc" ? 'desc' : 'none');
    applyFilters(selectedPets, selectedServices)
  }

  const applyFilters = async (selectedPetTypes, selectedServiceTypes) => {

    try {
      const response = await axios.post('https://petvogue.onrender.com/services/get', {
        filters: {
          animalType_filter: selectedPetTypes.length > 0 ? selectedPetTypes : undefined,
          category_filter: selectedServiceTypes.length > 0 ? selectedServiceTypes : undefined,
          price_order: sort !== "none" ? sort : undefined,
        },
        page: 1,
        itemsPerPage: 50,
      });
      dispatch(fetchServicesSuccess(response.data.rows));
    } catch (err) {
      dispatch(fetchServicesFailure(err.message));
    }

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
        <YellowButton onClick={handleSort} sx={{ margin: '2px' }}>Ordenar</YellowButton>
        <LinkNoDeco to={'/crearServicio'}>
          <YellowButton sx={{ margin: '2px' }}>Crear servicio</YellowButton>
        </LinkNoDeco>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {[
            { group: "MASCOTA", category: 'ANIMALTYPE', icon: <Pets />, options: filters.mascota },
            { group: "GENERAL", category: 'SERVICE', icon: <Category />, options: filters.general },
            { group: "ESTETICA", category: 'SERVICE', icon: <Extension />, options: filters.estetica },
          ].map(({ group, category, icon, options }) => (
            <div key={group}>
              <ListItem>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={group} />
              </ListItem>
              {options.map((option, index) => (
                <ListItem key={index}>
                  <Checkbox
                    checked={category === 'SERVICE' ? selectedServices.includes(option) : selectedPets.includes(option)}
                    onChange={() => (category === 'SERVICE' ? handleServiceCheckboxChange(option) : handlePetCheckboxChange(option))}
                  />
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Drawer>

      <Grid container spacing={2} justifyContent="center">
        {services.length && services.map((servicio, index) => (
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
                <Typography>
                  <strong></strong>
                  <LinkNoDeco to={`/detallesServicios/${servicio.serviceID}`}>
                    <img src={servicio.image} alt={servicio.name} style={{ width: '100%' }} />
                  </LinkNoDeco>
                </Typography>
                <Typography>
                  <strong>Precio:</strong> {servicio.price}
                </Typography>
                <div sx={{ paddingTop: 2 }}>
                  <Typography>{servicio.description}</Typography>
                </div>
              </CardContent>
              <LinkNoDeco to={`/editarServicio/${servicio.serviceID}`}>
                <YellowButton>
                  Editar
                </YellowButton>
              </LinkNoDeco>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiciosAnimales;