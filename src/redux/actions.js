// actions.js
import axios from "axios";
export const FETCH_SERVICES_REQUEST = "FETCH_SERVICES_REQUEST";
export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";
export const FETCH_SERVICES_FAILURE = "FETCH_SERVICES_FAILURE";
//🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾Actions Type
export const POST_SERVICE = "POST_SERVICE";
export const GET_SERVICE_DETAIL = "GET_SERVICE_DETAIL";
export const RESET_DETAIL_SERVICE = "RESET_DETAIL_SERVICE";
export const POST_PET = "POST_PET";
export const GET_ALL_PETS = "GET_ALL_PETS";
export const GET_PET_DETAIL = "GET_PET_DETAIL";
export const RESET_DETAIL_PET = "RESET_DETAIL_PET";
export const POST_USER = "POST_USER";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const RESET_DETAIL_PRODUCT = "RESET_DETAIL_PRODUCT";
export const GET_USER = "GET_USER";

export const ORDERS_BY_USER_ID = "ORDERS_BY_USER_ID";
export const RESET_DETAIL_ORDERS = "RESET_DETAIL_ORDERS";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const SET_LOGGED_IN = "SET_LOGGED_IN";

export const ORDER_DETAIL_REQUEST = 'ORDER_DETAIL_REQUEST';
export const ORDER_DETAIL_SUCCESS = 'ORDER_DETAIL_SUCCESS';
export const ORDER_DETAIL_FAILURE = 'ORDER_DETAIL_FAILURE';

const URL = "https://petvogue.onrender.com";
//const URL = "http://localhost:3001"


export const getOrderDetail = (orderId) => {
 return async (dispatch) => {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    try {
      const response = await axios.post(`${URL}/orders/get`, { 
        filters: {
          orderID_filter: orderId,
        },
      });
      
 // Desestructura la respuesta para obtener tanto los detalles de la orden como las reseñas
      const { order, reviews } = response.data;
      
      if (!order || !reviews) {
        throw new Error('Formato de respuesta inesperado');
      }

     dispatch({
        type: ORDER_DETAIL_SUCCESS,
        payload: { order, reviews }, // Envía tanto los detalles de la orden como las reseñas como parte del payload
     });
    } catch (error) {
      console.error(`Error al obtener los detalles del pedido👀: ${error}`);
      dispatch({
        type: ORDER_DETAIL_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesSuccess = (services) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: services,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: error,
});

//🎀Post Service:
export const createService = (service) => {
  return async (dispatch) => {
    try {
      console.log(service);
      const response = await axios.post(`${URL}/services/create`, service);
      window.alert("Servicio creado con exito!");
      return dispatch({
        type: POST_SERVICE,
        payload: response.data,
      });
    } catch (error) {
      window.alert(error?.response?.data?.error);
      console.error(`Error creating service👀: ${error}`);
    }
  };
};

//🎀Detail Service:
export const getServiceDetail = (serviceID) => {
  return async (dispatch) => {
    try {
      //dispatch(loading(true));
      const response = await axios.post(
        "https://petvogue.onrender.com/services/get",
        {
          filters: {
            serviceID_filter: serviceID,
          },
          page: 1,
          itemsPerPage: 50,
        }
      );
      return dispatch({
        type: GET_SERVICE_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error" + error.message);
    }
    //finally {
    //dispatch(loading(false));
  };
};

//🎀Reset Service Detail:
export const resetDetailService = () => {
  return { type: RESET_DETAIL_SERVICE, payload: [] };
};

//🎀Create Pet:
export const createPet = (pet) => {
  return async (dispatch) => {
    try {
      console.log(pet);
      const response = await axios.post(`${URL}/pets/create`, pet);
      window.alert("Mascota creada con exito!");
      return dispatch({
        type: POST_PET,
        payload: response.data,
      });
    } catch (error) {
      window.alert(error?.response?.data?.error);
      console.error(`Error creating Pet👀: ${error}`);
    }
  };
};

//🎀Get All Pets:
export const getAllPets = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/pets/get`, {
        filters: {},
        page: 1,
        itemsPerPage: 50,
      });
      return dispatch({
        type: GET_ALL_PETS,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error getting all pets👀: ${error}`);
    }
  };
};

//🎀Get All Products:
export const getProducts = (productName, types, priceSort) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/products/get`, {
        filters: {
          name_filter: productName || undefined,
          type_filter: types.length ? types : undefined,
          price_order: priceSort !== 'none' ? priceSort : undefined,
        },
        page: 1,
        itemsPerPage: 50,
      });
      return dispatch({
        type: GET_PRODUCTS,
        payload: response.data.rows,
      });
    } catch (error) {
      console.error(`Error getting all products👀: ${error}`);
    }
  };
};

//🎀Detail Product:
export const getProductDetail = (productID) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/products/get`, {
        filters: {
          productID_filter: productID,
        },
        page: 1,
        itemsPerPage: 50,
      });
      console.log(response.data);
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error getting product detail👀: ${error}`);
    }
  };
};

//🎀Reset Detail Product:
export const resetDetailProduct = () => {
  return { type: RESET_DETAIL_PRODUCT, payload: [] };
};

//🎀Detail Pet:
export const getPetDetail = (petID) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/pets/get`, {
        filters: {
          petID_filter: petID,
        },
        page: 1,
        itemsPerPage: 50,
      });
      console.log(response.data);
      return dispatch({
        type: GET_PET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error getting pet detail👀: ${error}`);
    }
  };
};

//🎀Reset Detail Pet:
export const resetDetailPet = () => {
  return { type: RESET_DETAIL_PET, payload: [] };
};

// crear un usuario
export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/users/create`, userData);
      console.log(response.data, "action");
      return dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error creating user: ${error}`);
    }
  };
};

export const getUser = (userID) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/users/get`,{
        filters:{
          userID_filter: userID,
        }
      });
      console.log(response.data, "action");
      return dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error getting user: ${error}`);
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/users/login`, userData);
      return dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error) {
      return {
        error
      }
    }
  };
};

export const logoutUser = () => ({
  type: USER_LOGOUT,
});

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/users/register`, userData);
      return dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error) {
      return {
        error
      }
    }
  };
};

//🎀Get orders by user:
export const OrdersByUserId = (userId) => {
  return async (dispatch) =>{
  try {
  const response = await axios.post('https://petvogue.onrender.com/orders/get', {
    filters: {
      userID_filter: userId,
    },
    page: 1,
    itemsPerPage: 10,
  });
 // console.log(response.data.rows);
  return dispatch({
    type: ORDERS_BY_USER_ID,
    payload: response.data,
  });
} catch (error) {
  console.error(`Error al obtener ordenes: ${error}`);
}
};
}

//🎀Reset detail:
export const resetDetailOrders = () => {
  return { type: RESET_DETAIL_ORDERS, payload: [] };
};