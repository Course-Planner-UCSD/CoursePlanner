import {
  REGISTER,
  LOGIN,
  AUTH_ERROR,
  LOGOUT,
  CHECK_AUTH,
} from "../../other/types";

const originalState = {
  userAuth: false,
  token: localStorage.getItem("token"),
  error: null,
};

function authReducer(state = originalState, action) {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        userAuth: true,
        error: null,
      };
    case CHECK_AUTH:
      return {
        ...state,
        userAuth: true,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: false,
        token: null,
        email: null,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: false,
        token: null,
        email: null,
      };
    default:
      return state;
  }
}

export default authReducer;
