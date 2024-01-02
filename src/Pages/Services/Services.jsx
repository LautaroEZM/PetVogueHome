import React, { useEffect } from 'react';
import {
  Checkbox,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Category, Pets, Extension } from '@mui/icons-material';
import { YellowButton } from '../../styledComponents';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
} from '../../redux/actions';
import axios from 'axios';
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

  const [filters, setFilters] = React.useState({ animal: [], especialidad: [], otros: [] });
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleFilterToggle = (category, option) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const categoryFilters = newFilters[category];

      if (categoryFilters.includes(option)) {
        newFilters[category] = categoryFilters.filter((item) => item !== option);
      } else {
        newFilters[category] = [...categoryFilters, option];
      }

      return newFilters;
    });
  };

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
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {/* ... (tu código actual) */}
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
