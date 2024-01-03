// reducers.js
import {
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_FAILURE,
    POST_SERVICE,
    POST_PET,
  } from './actions';
  
  const initialState = {
    services: [],
    pets: [],
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
     
     case POST_PET:
          return {
       ...state,
       pets: [...state.pets, action.payload],
     };


      default:
        return state;
    }
  };
  
  export default rootReducer;
  