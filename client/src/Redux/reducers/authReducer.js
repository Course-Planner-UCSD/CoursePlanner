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
      };
    case CHECK_AUTH:
      return {
        ...state,
        userAuth: true,
      };
    case AUTH_ERROR:
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
