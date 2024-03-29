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
  SET_USER,
  USER_LOGOUT,
  ORDERS_BY_USER_ID,
  RESET_DETAIL_ORDERS,
  SET_LOADING,
  UPDATE_USER,
  GET_ORDER_DETAIL,
  RESET_ORDERS,
  POST_REVIEWS,
  REVIEWS_BY_PRODUCT_ID,
  RESET_REVIEWS,
} from "./actions";

const initialState = {
  services: [],
  detailServices: {},
  pets: [],
  petDetail: {},
  products: [],
  productDetail: {},
  orderDetail: {},
  reviews: [],
  reviewsProductId: {},
  user: null,
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

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
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
        loading: false,
        products: action.payload,
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        loading: false,
        productDetail: action.payload,
      };

    case RESET_DETAIL_PRODUCT:
      return {
        ...state,
        productDetail: initialState.productDetail,
      };

    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
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
                user: action.payload,

              };

              case GET_ORDER_DETAIL:
                return {
                  ...state,
                  orderDetail: action.payload,
                };

                case RESET_ORDERS: 
                return {
                  ...state,
                  orderDetail: initialState.ordersUser,
                };

                case POST_REVIEWS:
                  return {
                    ...state,
                    reviews: [...state.reviews, action.payload],
                  };
                
                case REVIEWS_BY_PRODUCT_ID:
                  return {
                    ...state,
                    reviewsProductId: action.payload,
                  };

                  case RESET_REVIEWS:
                    return {
                      ...state,
                      reviewsProductId: initialState.reviewsProductId,
                    };

           default:
            return state;
  }
};

export default rootReducer;
