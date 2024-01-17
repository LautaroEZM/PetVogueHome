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
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
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
  const user = useSelector((state) => state.user);
  const [sortPrice, setSortPrice] = useState('none');
  const [searchText, setSearchText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getProducts(searchText, selectedTypes, sortPrice));
  }, [dispatch, searchText, selectedTypes, sortPrice]);

  const productsMap = productsData.length ? productsData.reduce((a, product) => ({ ...a, [product.productID]: product }), {}) : {};

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const handleAddItem = async (product, quantity = 1) => {
    try {

      await axios.put('https://petvogue.onrender.com/users/addcart', {
        userID: user?.userID,
        productID: product?.productID,
        qty: quantity,
      });

      dispatch(getUser(user?.userID))
    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
    }
  };

  const handleRemoveItem = async (product, quantity = 1) => {
    try {

      await axios.put('https://petvogue.onrender.com/users/removecart', {
        userID: user?.userID,
        productID: product?.productID,
        qty: quantity,
      });

      dispatch(getUser(user?.userID))
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

  const updateQuantity = (cartItem, newQuantity) => {
    if (newQuantity > cartItem.quantity) {
      handleAddItem(productsMap[cartItem.productID], newQuantity);
    } else {
      handleRemoveItem(productsMap[cartItem.productID], newQuantity);
    }
  };

  const calculateTotal = () => {
    const total = user?.cart2.reduce((acc, item) => {
      const product = productsMap[item.productID]
      return acc + (product ? product.price * (item.quantity || 1) : 0)
    }, 0);
    return total ? total.toFixed(2) : 0;
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
        {currentProducts?.length && currentProducts.map((product) => (
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
            <YellowButtonCart onClick={() => handleAddItem(product)}>
              <AddShoppingCartIcon style={{ marginRight: '5px' }} />
            </YellowButtonCart>
          </div>
        ))}

        {totalPages > 1 && (
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}

        <div className={`${styles.cartButtonContainer} ${styles.fixedCartButton}`}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="carrito"
            onClick={toggleCart}
            className={styles.cartButton}
          >
            <Badge badgeContent={user?.cart2?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>

        <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
          <List>
            {user?.cart2?.length && user.cart2.map((cartItem) => (
              productsMap[cartItem.productID] && <ListItem key={cartItem.productID}>
                <img src={productsMap[cartItem.productID].image} alt={productsMap[cartItem.productID].name} style={{ marginRight: '10px', maxWidth: '50px' }} />
                <div>
                  <Typography variant="subtitle1"><strong>{productsMap[cartItem.productID].name}</strong></Typography>
                  <Typography variant="body2"><strong>Tipo:</strong> {productsMap[cartItem.productID].type}</Typography>
                  <Typography variant="body2"><strong>Precio: </strong>${productsMap[cartItem.productID].price}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => updateQuantity(cartItem, cartItem.quantity - 1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body2">{cartItem.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(cartItem, cartItem.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <YellowButtonSmall sx={{ margin: "5px" }} onClick={() => removeFromCart(productsMap[cartItem].productID)}>
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
              { group: "TIPO", options: ['Medicamento', 'Juguete'] },
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
