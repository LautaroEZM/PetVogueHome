import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions';
import {
  Typography,
  CardHeader,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { YellowButtonSmall } from '../../styledComponents';

const Products = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleClearCart = () => {
    // Lógica para limpiar el carrito
  };

  const handleCheckout = () => {
    // Lógica para realizar la compra
  };

  const productss = Array.isArray(productsData.rows) ? productsData.rows : [];

  return (
    <div className={styles.productCardsContainer}>
      {productss.map((product) => (
        <div key={product.productID} className={styles.productCard}>
          <CardHeader title={product.name} />
          <div>
            <Link key={product.productID} to={`/detallesProductos/${product.productID}`}>
              <img src={product.image} alt={product.name} className={styles.CardImg} />
            </Link>
          </div>
          <Typography>
            <strong>Precio:</strong> {product.price}
          </Typography>
          <YellowButtonSmall></YellowButtonSmall>
        </div>
      ))}

      {/* Botón fijo de carrito */}
      <div className={styles.cartButtonContainer}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="carrito"
          onClick={toggleCart}
          className={styles.cartButton}
        >
          {/* Badge para mostrar la cantidad de productos en el carrito */}
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>

      {/* Drawer del carrito */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <List>
          {/* Mapeo de productos en el carrito */}
          {/* Cada ListItem representa un producto en el carrito */}
          {[] /* Reemplaza con la lista de productos en el carrito */}
          <ListItem>
            <ListItemText primary="Total: $0.00" />
          </ListItem>
          <ListItem>
            <Button variant="outlined" onClick={handleClearCart}>
              Limpiar Carrito
            </Button>
            <Button variant="contained" color="primary" onClick={handleCheckout}>
              Realizar Compra
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Products;