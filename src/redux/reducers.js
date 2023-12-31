// reducers.js
import {
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_FAILURE,
    POST_SERVICE,
    POST_PET,
    GET_SERVICE_DETAIL,
    RESET_DETAIL_SERVICE,
    GET_ALL_PETS,
    GET_PET_DETAIL,
    POST_USER
  } from './actions';
  
  const initialState = {
    services: [],
    detailServices: {},
    pets: [],
    petDetail: {},
    users: [],
    loading: false,
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SERVICES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SERVICES_SUCCESS:
        return {
          ...state,
          loading: false,
          services: action.payload,
        };
      case FETCH_SERVICES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      //🎀Agregado post:
      case POST_SERVICE:
          return {
       ...state,
       services: [...state.services, action.payload],
     };

     case GET_SERVICE_DETAIL:
      return {
        ...state,
        detailServices: action.payload,
      };

      case RESET_DETAIL_SERVICE:
       return {
        ...state,
       detailServices: initialState.detailServices,
     };
     
     case POST_PET:
          return {
           ...state,
           pets: [...state.pets, action.payload],
        };

        case GET_ALL_PETS:
         return {
          ...state,
          pets: action.payload,
        };

     case GET_PET_DETAIL:
       return {
        ...state,
        petDetail: action.payload,
      };

     case POST_USER:
     return {
       ...state,
       users: [...state.users, action.payload],
     };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
