// actions.js
import axios from "axios";
export const FETCH_SERVICES_REQUEST = 'FETCH_SERVICES_REQUEST';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_FAILURE = 'FETCH_SERVICES_FAILURE';
//🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾Actions Type
export const POST_SERVICE = "POST_SERVICE";
export const POST_PET = "POST_PET";
//export const GET_SERVICES = "GET_SERVICES";



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

//export default createService;

//🎀Post Service:
export const createService = (service) => {
  return async(dispatch) => {
  try {
    console.log(service);
    await axios.post('https://petvogue.onrender.com/services/create', service);
    window.alert("Servicio creado con exito!");
    //ver lo del local Storage👀:
    //
    return  dispatch ({
      type: POST_SERVICE,
      payload: response.data,
    })
  } catch (error) {
    window.alert(error?.response?.data?.error);
    // console.error(`Error creating service: ${error}`);
    // alert(error.message);
  }
 }};

 //🎀Get Services:
//  export const getServices = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`https://petvogue.onrender.com/services`);

//       return dispatch({
//         type: GET_SERVICES,
//         payload: response.data,
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };

//🎀Create Pet:
// export const createPet = (pet) => {
//   return async(dispatch) => {
//   try {
//     console.log(pet);
//     const response = await axios.post('https://petvogue.onrender.com/services/create', pet);
//     window.alert("Servicio creado con exito!");
//     return dispatch ({
//       type: POST_PET,
//       payload: response.data,
//     })
//   } catch (error) {
//     window.alert(error?.response?.data?.error);
//     console.error(`Error creating Pet👀: ${error}`);
//   }
//   }};

export const createPet = (pet) => {
  return async(dispatch) => {
  try {
  console.log(pet);
  const response = await axios.post('https://petvogue.onrender.com/services/create', pet);
  window.alert("Mascota creada con exito!");
  return dispatch ({
    type: POST_PET,
    payload: response.data,
  })
  } catch (error) {
  window.alert(error?.response?.data?.error);
  console.error(`Error creating Pet👀: ${error}`);
  }
  }};

 


