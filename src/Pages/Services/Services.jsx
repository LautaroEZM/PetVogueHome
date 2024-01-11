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
  TextField,
  Box,
  Container
} from '@mui/material';
import { LinkNoDeco, YellowButton, YellowButtonSmall } from '../../styledComponents';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
} from '../../redux/actions';
import axios from 'axios';
import { Pets, Category, Extension, ArrowDropDown, ArrowDropUp, SortByAlpha, AttachMoney } from '@mui/icons-material';

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

  const [sortPrice, setSortPrice] = React.useState('none');
  const [sortName, setSortName] = React.useState('none');
  const [searchText, setSearchText] = React.useState('');
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

  const handleSortPrice = () => {
    const newSortPrice = sortPrice === 'none' ? 'asc' : sortPrice === "asc" ? 'desc' : 'none';
    setSortPrice(newSortPrice);
    applyFilters(selectedPets, selectedServices, null, newSortPrice);
  }

  const handleSortName = () => {
    const newSortName = sortName === 'none' ? 'asc' : sortName === "asc" ? 'desc' : 'none';
    setSortName(newSortName);
    applyFilters(selectedPets, selectedServices, newSortName, null);
  }

  const applyFilters = async (selectedPetTypes, selectedServiceTypes, selectedSortName, selectedSortPrice) => {
    try {
      const response = await axios.post('https://petvogue.onrender.com/services/get', {
        filters: {
          animalType_filter: selectedPetTypes.length > 0 ? selectedPetTypes : undefined,
          category_filter: selectedServiceTypes.length > 0 ? selectedServiceTypes : undefined,
          price_order: selectedSortPrice !== "none" ? selectedSortPrice : undefined,
          name_order: selectedSortName !== "none" ? selectedSortName : undefined,
          name_filter: searchText !== '' ? searchText : undefined, // Agrega el filtro de búsqueda
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Container>
          <Toolbar>
            <YellowButton onClick={toggleDrawer} sx={{ margin: '2px' }}>
              Filtros
            </YellowButton>
          </Toolbar>
        </Container>

        <Container sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Buscar"
            variant="outlined"
            sx={{ marginRight: '8px' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <YellowButton onClick={() => applyFilters(selectedPets, selectedServices)}>
            Buscar
          </YellowButton>
        </Container>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <YellowButtonSmall onClick={handleSortPrice}>
            <AttachMoney />
            {sortPrice === 'asc' && <ArrowDropUp />} {/* Flecha hacia arriba si es ascendente */}
            {sortPrice === 'desc' && <ArrowDropDown />} {/* Flecha hacia abajo si es descendente */}
          </YellowButtonSmall>
          <YellowButtonSmall onClick={handleSortName}>

            <SortByAlpha /> {/* Icono de MUI para representar ordenar alfabéticamente */}
            {sortName === 'asc' && <ArrowDropUp />} {/* Flecha hacia arriba si es ascendente */}
            {sortName === 'desc' && <ArrowDropDown />} {/* Flecha hacia abajo si es descendente */}
          </YellowButtonSmall>
        </Box>
      </Box>


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
                width: 355,  // Establecer el ancho deseado
                height: 555, // Establecer la altura deseada
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 gi8px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardHeader title={servicio.name} />
              <CardContent>
                <Typography>
                  <strong>{servicio.category}</strong>
                </Typography>
                <Typography>
                  <strong></strong>
                  <LinkNoDeco to={`/detallesServicios/${servicio.serviceID}`}>
                    <img src={servicio.image} alt={servicio.name} style={{ width: '80%' }} />
                  </LinkNoDeco>
                </Typography>
                <Typography>
                  <strong>Precio:</strong> ${servicio.price}
                </Typography>
                <div sx={{ paddingTop: 2 }}>
                  <Typography>{servicio.description}</Typography>
                </div>
              </CardContent>
              <LinkNoDeco to={`/editarServicio/${servicio.serviceID}`}>
                <YellowButton>
                  Adquirir
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