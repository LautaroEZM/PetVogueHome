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
    RESET_DETAIL_PET,
    GET_PRODUCTS,
    GET_PRODUCT_DETAIL,
    RESET_DETAIL_PRODUCT,
    POST_USER,
    USER_LOGOUT,
    ORDERS_BY_USER_ID,
    RESET_DETAIL_ORDERS,
    UPDATE_USER,
    SET_USER,
  } from './actions';
  
  const initialState = {
    services: [],
    detailServices: {},
    pets: [],
    petDetail: {},
    products: [],
    productDetail: {},
    users: [],
    ordersUser: [], 
    //editUserForm: {},
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

      case RESET_DETAIL_PET:
        return {
          ...state,
          petDetail: initialState.petDetail,
        };

      case GET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
        };
      
      case GET_PRODUCT_DETAIL:
        return {
          ...state,
          productDetail: action.payload,
        }; 
        
      case RESET_DETAIL_PRODUCT:
          return {
            ...state,
            productDetail: initialState.productDetail,
          };
  
     case POST_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
      case USER_LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        users: [],
      };

      case ORDERS_BY_USER_ID:
        return {
          ...state, 
          ordersUser: action.payload,
        }

        case RESET_DETAIL_ORDERS:
          return {
            ...state,
            ordersUser: initialState.ordersUser,
          };

          case SET_USER:
            return {
              ...state,
              user: action.payload,
            };

          case UPDATE_USER://en revision
            return {
             ...state,
          // users: state.users.map(user => 
          // user.id === action.payload.id ? action.payload : user
   //),   
              users: [
                {
                 ...state.users[0],
                 user: action.payload,
                }
              ]
 

 };

    default:
      return state;
  }
};

export default rootReducer;
