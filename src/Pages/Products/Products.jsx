import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getUser } from '../../redux/actions';
import {
  Typography,
  CardHeader,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
  Box,
  Container,
  TextField,
  Toolbar,
  Checkbox
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp, AttachMoney } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  YellowButtonCart,
  YellowButton,
  YellowButtonSmall,
  YellowButtonNoBorderRadius,
  YellowButtonNoBorderRadiusEmpty
} from '../../styledComponents';

const Products = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const loggedUser = useSelector((state) => state.users[0].user);
  const [sortPrice, setSortPrice] = useState('none');
  const [searchText, setSearchText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts(searchText, selectedTypes, sortPrice));

  }, [dispatch, searchText, selectedTypes, sortPrice]);

  useEffect(() => {

  }, [productsData]);

  const productsMap = productsData.reduce((a, product) => ({ ...a, [product.productID]: product }), {})
  console.log('productsMap', productsMap);

  const handleProductClick = async (product) => {
    try {
      await axios.put('https://petvogue.onrender.com/users/addcart', {
        userID: loggedUser.userID,
        productID: product.productID,
        quantity: 1,
      });
      dispatch(getUser(loggedUser.userID))

    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
    }
  };



  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleClearCart = () => {
    // Lógica para limpiar el carrito
  };

  const handleCheckout = () => {
    // Lógica para realizar la compra
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSortPrice = () => {
    const newSortPrice = sortPrice === 'none' ? 'asc' : sortPrice === "asc" ? 'desc' : 'none';
    setSortPrice(newSortPrice);
    applyFilters(selectedTypes, newSortPrice);
  };

  const applyFilters = async () => {
    dispatch(getProducts(searchText, selectedTypes, sortPrice));
  };

  const handleTypeCheckboxChange = (type) => {
    const newSelectedTypes = [...selectedTypes];
    const typeIndex = newSelectedTypes.indexOf(type);

    if (typeIndex === -1) {
      newSelectedTypes.push(type);
    } else {
      newSelectedTypes.splice(typeIndex, 1);
    }
    setSelectedTypes(newSelectedTypes);
  };

  const removeFromCart = (productId) => {
    //   const updatedCart = cartItems.filter((item) => item.product.productID !== productId);
    //   setCartItems(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    //   const updatedCart = cartItems.map((item) =>
    //     item.product.productID === productId ? { ...item, quantity: newQuantity } : item
    //   );
    //   setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    const total = loggedUser.cart.reduce((total, itemID) => {
      const product = productsMap[itemID]
      console.log('asdasdasd', product);
      return total + product.price * product.quantity
    }, 0);
    return total.toFixed(2);
  };

  return (
    <div className={styles.productCardsContainer}>
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
        </Container>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <YellowButtonSmall onClick={handleSortPrice}>
            <AttachMoney />
            {sortPrice === 'asc' && <ArrowDropUp />}
            {sortPrice === 'desc' && <ArrowDropDown />}
          </YellowButtonSmall>
        </Box>
      </Box>
      <Box className={styles.productCardsContainer}>
        {productsData?.length && productsData.map((product) => (
          <div key={product.productID} className={`${styles.productCard} ${styles.stickyButtonContainer}`}>
            <CardHeader title={product.name} sx={{
              background: '#ffbb00',
              borderRadius: '50px',
              minHeight: '70px'
            }} />
            <div>
              <Link key={product.productID} to={`/detallesProductos/${product.productID}`}>
                <img src={product.image} alt={product.name} className={styles.CardImg} />
              </Link>
            </div>
            <Typography>
              <strong>Precio: </strong>${product.price}
            </Typography>
            <YellowButtonCart onClick={() => handleProductClick(product)}>
              <AddShoppingCartIcon style={{ marginRight: '5px' }} />
            </YellowButtonCart>
          </div>
        ))}

        <div className={`${styles.cartButtonContainer} ${styles.fixedCartButton}`}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="carrito"
            onClick={toggleCart}
            className={styles.cartButton}
          >
            <Badge badgeContent={loggedUser.cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>

        <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
          <List>
            {loggedUser?.cart?.length && loggedUser.cart.map((cartItemID) => (
              productsMap[cartItemID] && <ListItem key={cartItemID}>
                <img src={productsMap[cartItemID].image} alt={productsMap[cartItemID].name} style={{ marginRight: '10px', maxWidth: '50px' }} />
                <div>
                  <Typography variant="subtitle1"><strong>{productsMap[cartItemID].name}</strong></Typography>
                  <Typography variant="body2"><strong>Tipo:</strong> {productsMap[cartItemID].type}</Typography>
                  <Typography variant="body2"><strong>Precio: </strong>${productsMap[cartItemID].price}</Typography>
                  <TextField
                    type="number"
                    label="Cantidad"
                    value={productsMap[cartItemID].quantity}
                    sx={{ margin: '10px' }}
                    inputProps={{ min: 1, max: productsMap[cartItemID].stock }}
                    onChange={(e) => updateQuantity(productsMap[cartItemID].productID, parseInt(e.target.value, 10))}
                  />
                  <YellowButtonSmall sx={{ margin: "5px" }} onClick={() => removeFromCart(productsMap[cartItemID].productID)}>
                    Eliminar
                  </YellowButtonSmall>
                </div>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary={`Total: $${calculateTotal()}`} />
            </ListItem>
            <ListItem>
              <YellowButtonNoBorderRadiusEmpty variant="outlined" onClick={handleClearCart}>
                Limpiar Carrito
              </YellowButtonNoBorderRadiusEmpty>
              <YellowButtonNoBorderRadius variant="contained" color="primary" onClick={handleCheckout}>
                Realizar Compra
              </YellowButtonNoBorderRadius>
            </ListItem>
          </List>
        </Drawer>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            {[
              { group: "TIPO", options: ['Medicamentos', 'Juguetes'] },
            ].map(({ group, options }) => (
              <div key={group}>
                <ListItem>
                  <ListItemText primary={group} />
                </ListItem>
                {options.map((option, index) => (
                  <ListItem key={index}>
                    <Checkbox
                      checked={selectedTypes.includes(option)}
                      onChange={() => handleTypeCheckboxChange(option)}
                    />
                    <ListItemText primary={option} />
                  </ListItem>
                ))}
              </div>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Products;
