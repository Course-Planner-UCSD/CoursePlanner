import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOADED_USER,
  AUTH_ERROR,
  LOGOUT,
  VIEW_PLAN,
  UPDATE_PLAN,
} from "../other/types";

const originalState = {
  userAuth: false,
  user: null,
  planData: [],
  token: localStorage.getItem("token"),
};

function authReducer(state = originalState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        userAuth: true,
      };
    case LOADED_USER:
      return {
        ...state,
        user: action.payload,
        userAuth: true,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: false,
        planData: [],
        token: null,
        user: null,
      };
    case VIEW_PLAN:
      return {
        ...state,
        planData: action.payload,
      };
    case UPDATE_PLAN:
      return {
        ...state,
        planData: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;
