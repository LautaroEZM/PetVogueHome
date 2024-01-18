import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getUser, setLoading } from "../../redux/actions";
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
  Pagination,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, AttachMoney } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import {
  YellowButtonCart,
  YellowButton,
  YellowButtonSmall,
  YellowButtonNoBorderRadius,
  YellowButtonNoBorderRadiusEmpty,
} from "../../styledComponents";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-89a38254-b75b-4862-a892-a12f6f2b67fc");

const Products = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [sortPrice, setSortPrice] = useState("none");
  const loading = useSelector((state) => state.loading);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [itemsOutOfStock, setItemsOutOfStock] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [filtersActive, setFiltersActive] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getProducts(searchText, selectedTypes, sortPrice));

    setIsSubmitDisabled(!user);
  }, [dispatch, searchText, selectedTypes, sortPrice, user]);

  const productsMap = productsData.length
    ? productsData.reduce(
      (a, product) => ({ ...a, [product.productID]: product }),
      {}
    )
    : {};
  useEffect(() => {

    validateStock();
  }, [user]);

  useEffect(() => {

    dispatch(getProducts(searchText, selectedTypes, sortPrice));
  }, []);


  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(productsData.length / itemsPerPage);


  const handleClearSearch = () => {
    setSearchText("");
  };

  const validateStock = () => {
    user?.cart2?.forEach((item) => {
      const product = productsMap[item.productID];

      if (product) {
        if (
          item.quantity > product.stock &&
          !itemsOutOfStock.includes(item.productID)
        ) {
          setItemsOutOfStock([...itemsOutOfStock, item.productID]);
        } else if (
          item.quantity <= product.stock &&
          itemsOutOfStock.includes(item.productID)
        ) {
          setItemsOutOfStock(
            itemsOutOfStock.filter(
              (itemOutOfStock) => itemOutOfStock !== item.productID
            )
          );
        }
      }
    });
  };

  const isDisabled = (product) => {
    const cartItem = user?.cart2?.find(
      (item) => item.productID === product.productID
    );
    if (loading || cartItem?.quantity + 1 > product.stock) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddItem = async (product) => {
    try {
      dispatch(setLoading(true));
      await axios.put("https://petvogue.onrender.com/users/addcart", {
        userID: user?.userID,
        productID: product?.productID,
        qty: 1,
      });
      dispatch(getUser(user?.userID));
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
    }
  };

  const handleRemoveItem = async (product, quantity = 1) => {
    try {
      dispatch(setLoading(true));
      await axios.put("https://petvogue.onrender.com/users/removecart", {
        userID: user?.userID,
        productID: product?.productID,
        qty: quantity,
      });
      dispatch(getUser(user?.userID));
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleClearCart = async () => {
    try {
      dispatch(setLoading(true));
      await axios.put("https://petvogue.onrender.com/users/emptycart", {
        userID: user?.userID,
      });
      dispatch(getUser(user?.userID));
    } catch (error) {
      console.error("Error al enviar el producto ", error);
    }
  };
  const createPreference = async () => {
    try {
      const response = await axios.post(
        "https://petvogue.onrender.com/mercadopago/redir",
        {
          userID: user?.userID,
          items: user.cart2,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al enviar el producto ", error);
    }
  };

  const handleBuy = async (products) => {
    dispatch(setLoading(true));
    dispatch(getUser(user?.userID));

    try {
      const response = await axios.post(
        "https://petvogue.onrender.com/mercadopago/redir",
        {
          userID: user?.userID,
          items: user.cart2,
        }
      );

      const id = response.data;

      if (id) {
        setPreferenceId(id);

        // Redirigir a MercadoPago
        window.location.href = id;
      }
    } catch (error) {
      console.error("Error al enviar el producto ", error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSortPrice = () => {
    const newSortPrice =
      sortPrice === "none" ? "asc" : sortPrice === "asc" ? "desc" : "none";
    setSortPrice(newSortPrice);
    applyFilters(selectedTypes, newSortPrice);
  };

  const applyFilters = async () => {
    dispatch(getProducts(searchText, selectedTypes, sortPrice));
    setFiltersActive(selectedTypes.length > 0 || sortPrice !== "none");
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
    handleRemoveItem(product, cartItem.quantity);
  };

  const updateQuantity = (cartItem, action) => {
    if (action === "add") {
      handleAddItem(productsMap[cartItem.productID]);
    } else {
      handleRemoveItem(productsMap[cartItem.productID]);
    }
  };

  const calculateTotal = () => {
    const total = user?.cart2.reduce((acc, item) => {
      const product = productsMap[item.productID];
      return acc + (product ? product.price * (item.quantity || 1) : 0);
    }, 0);
    return total ? total.toFixed(2) : 0;
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSortPrice("none");
    setFiltersActive(false);
    applyFilters();
  };

  console.log({ itemsOutOfStock, loading });

  return (
    <div className={styles.productCardsContainer}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Container>
          <Toolbar>
            <YellowButton onClick={toggleDrawer} sx={{ margin: "2px" }}>
              Filtros
            </YellowButton>
          </Toolbar>
        </Container>

        <Container sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Buscar"
            variant="outlined"
            sx={{ marginRight: "8px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* Botón para limpiar el campo de búsqueda */}
          {searchText && (
            <IconButton onClick={handleClearSearch}>
              <ClearIcon />
            </IconButton>
          )}
        </Container>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <YellowButtonSmall onClick={handleSortPrice}>
            <AttachMoney />
            {sortPrice === "asc" && <ArrowDropUp />}
            {sortPrice === "desc" && <ArrowDropDown />}
          </YellowButtonSmall>
        </Box>
      </Box>
      {/* Box para el mensaje de inicio de sesión */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Box para el mensaje de inicio de sesión */}
        <Box
          sx={{
            padding: "13px",
            borderRadius: "50px",
            margin: "8px 0",
            textAlign: "center",
          }}
        >
          {user ? (
            <div></div>
          ) : (
            <Typography>
              Debe <Link to="/ingresar">iniciar sesion</Link> para cargar productos al carrito
            </Typography>
          )}
        </Box>

        {/* Box para la paginación */}
        <Box>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              variant="outlined"
              primary
            />
          )}
        </Box>
      </div>


      <Box className={styles.productCardsContainer}>
        {currentProducts?.length ? (
          currentProducts.map((product) => (
            <div
              key={product.productID}
              className={`${styles.productCard} ${styles.stickyButtonContainer}`}
            >
              <CardHeader
                title={product.name}
                sx={{
                  background: "#ffbb00",
                  borderRadius: "50px",
                  minHeight: "70px",
                }}
              />
              <div>
                <Link
                  key={product.productID}
                  to={`/detallesProductos/${product.productID}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.CardImg}
                  />
                </Link>
              </div>
              <Typography>
                <strong>Precio: </strong>${product.price}
              </Typography>
              {user ? (
                <YellowButtonCart
                  onClick={() => handleAddItem(product)}
                  disabled={isDisabled(product)}
                >
                  <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                </YellowButtonCart>
              ) : (
                <YellowButtonCart
                  onClick={() => handleAddItem(product)}
                  disabled
                >
                  <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                </YellowButtonCart>
              )}
            </div>
          ))
        ) : (
          <Typography variant="body2">No hay elementos disponibles.</Typography>
        )}

        <Container
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              variant="outlined"
              primary
            />
          )}
        </Container>

        <div
          className={`${styles.cartButtonContainer} ${styles.fixedCartButton}`}
        >
          {user ? (
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
          ) : (
            <div>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="carrito"
                onClick={toggleCart}
                className={styles.cartButton}
                disabled
              >
                <Badge badgeContent={user?.cart2?.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          )}
        </div>

        <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
          {user?.cart2?.length ? (
            <List>
              {user?.cart2?.length &&
                user.cart2.map(
                  (cartItem) =>
                    productsMap[cartItem.productID] && (
                      <ListItem key={cartItem.productID}>
                        <img
                          src={productsMap[cartItem.productID].image}
                          alt={productsMap[cartItem.productID].name}
                          style={{ marginRight: "10px", maxWidth: "50px" }}
                        />
                        <div>
                          <Typography variant="subtitle1">
                            <strong>
                              {productsMap[cartItem.productID].name}
                            </strong>
                          </Typography>
                          <Typography variant="body2">
                            <strong>Tipo:</strong>{" "}
                            {productsMap[cartItem.productID].type}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Precio: </strong>$
                            {productsMap[cartItem.productID].price}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Stock disponible: </strong>
                            {productsMap[cartItem.productID].stock}
                          </Typography>
                          <Container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              onClick={() => updateQuantity(cartItem, "remove")}
                              disabled={loading || cartItem.quantity === 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="body2">
                              {cartItem.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => updateQuantity(cartItem, "add")}
                              disabled={
                                loading ||
                                cartItem.quantity ===
                                productsMap[cartItem.productID].stock
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Container>
                          <YellowButtonSmall
                            sx={{ margin: "5px" }}
                            onClick={() => removeFromCart(cartItem)}
                          >
                            Eliminar
                          </YellowButtonSmall>
                          {itemsOutOfStock.includes(cartItem.productID) && (
                            <Typography sx={{ color: "red" }}>
                              Item sin stock.
                            </Typography>
                          )}
                        </div>
                      </ListItem>
                    )
                )}
              <ListItem>
                <ListItemText primary={`Total: $${calculateTotal()}`} />
              </ListItem>
              <ListItem>
                <YellowButtonNoBorderRadiusEmpty
                  variant="outlined"
                  onClick={handleClearCart}
                >
                  Limpiar Carrito
                </YellowButtonNoBorderRadiusEmpty>
                <YellowButtonNoBorderRadius
                  variant="contained"
                  color="primary"
                  onClick={() => handleBuy(productsMap)}
                  disabled={itemsOutOfStock.length}
                >
                  Realizar Compra
                </YellowButtonNoBorderRadius>
              </ListItem>
            </List>
          ) : (
            <Typography
              sx={{
                padding: "50px",
              }}
            >
              <strong>El carrito esta vacio.</strong>
            </Typography>
          )}
        </Drawer>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            {[
              {
                group: "TIPO",
                options: ["Medicamento", "Juguete", "Alimento", "Accesorio"],
              },
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
            <ListItem>
              <YellowButtonNoBorderRadiusEmpty
                onClick={handleClearFilters}
                variant="outlined"
              >
                Limpiar Filtros
              </YellowButtonNoBorderRadiusEmpty>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div >
  );
};

export default Products;
