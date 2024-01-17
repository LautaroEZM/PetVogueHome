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
  Checkbox,
  Pagination
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

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-89a38254-b75b-4862-a892-a12f6f2b67fc');

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

  const [preferenceId, setPreferenceId] = useState(null)
  const userID = useSelector((state) => state.users[0].user.userID);
  
 

  
  useEffect(() => {
    dispatch(getProducts(searchText, selectedTypes, sortPrice));
  }, [dispatch, searchText, selectedTypes, sortPrice]);

  const productsMap = productsData.length ? productsData.reduce((a, product) => ({ ...a, [product.productID]: product }), {}) : {};

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const handleAddItem = async (product) => {
    try {

      await axios.put('https://petvogue.onrender.com/users/addcart', {
        userID: user?.userID,
        productID: product?.productID,
        qty: 1,
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

  const handleClearCart = async () => {
    try {

      await axios.put('https://petvogue.onrender.com/users/emptycart', {
        userID: user?.userID,
      });

      dispatch(getUser(user?.userID))
    } catch (error) {
      console.error('Error al limpiar el carrito', error);
    }
  };

  const createPreference = async () => {
    try {
      const response = await axios.post('https://petvogue.onrender.com/mercadopago/redir', {
        userID: user?.userID,
        items: user.cart2
      });
      return response.data; 
    } catch (error) {
      console.error('Error al enviar el producto ', error);
    }
    
  };
  

  const handleBuy = async (products) => {
    const id = await createPreference(products);
       if(id){
    setPreferenceId(id);
}

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

  const removeFromCart = (cartItem) => {
    const product = productsMap[cartItem.productID];
    handleRemoveItem(product, cartItem.quantity)
  };

  const updateQuantity = (cartItem, action) => {
    if (action === 'add') {
      handleAddItem(productsMap[cartItem.productID]);
    } else {
      handleRemoveItem(productsMap[cartItem.productID]);
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
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          {totalPages > 1 && (
          <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} variant="outlined" primary />
          //posible error el primary que esta agregado al final
        )}
        </Container>



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
          {user?.cart2?.length ? (
            <List>
              {user?.cart2?.length && user.cart2.map((cartItem) => (
                productsMap[cartItem.productID] && <ListItem key={cartItem.productID}>
                  <img src={productsMap[cartItem.productID].image} alt={productsMap[cartItem.productID].name} style={{ marginRight: '10px', maxWidth: '50px' }} />
                  <div>
                    <Typography variant="subtitle1"><strong>{productsMap[cartItem.productID].name}</strong></Typography>
                    <Typography variant="body2"><strong>Tipo:</strong> {productsMap[cartItem.productID].type}</Typography>
                    <Typography variant="body2"><strong>Precio: </strong>${productsMap[cartItem.productID].price}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => updateQuantity(cartItem, 'remove')}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2">{cartItem.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(cartItem, 'add')}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <YellowButtonSmall sx={{ margin: "5px" }} onClick={() => removeFromCart(cartItem)}>
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
                <YellowButtonNoBorderRadius variant="contained" color="primary" onClick={() => handleBuy(productsMap)}>
                    Realizar Compra
                  </YellowButtonNoBorderRadius>
                        {preferenceId && preferenceId !== 'undefined' && (
                <YellowButtonNoBorderRadius variant="contained" color="primary" onClick={() => window.location.href = preferenceId}>
                   MERCADOPAGO
                </YellowButtonNoBorderRadius>
)}
              </ListItem>
            </List>
          ) : (
            <Typography><strong>El carrito esta vacio.</strong></Typography>
          )}
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
