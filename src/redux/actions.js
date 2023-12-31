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
export const POST_USER = "POST_USER";
// const URL = "https://petvogue.onrender.com";
const URL = "http://localhost:3001"

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
      const response = await axios.post(`${URL}/services/get`, {
        filters: {
          serviceID_filter: serviceID,
        },
      });
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

//🎀Detail Pet:
export const getPetDetail = (petID) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/pets/get`, {
        filters: {
          petID_filter: petID,
        },
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

// crear un usuario
export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/users/create`, userData);
      console.log(response.data, "action");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.newUser));
      return dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error creating user: ${error}`);
    }
  };
};
