import axios from "axios";
import { LOGIN_SUCCESS, AUTH_ERROR } from "../other/types";
import { loadUserData } from "./loadUser";

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  //sends post request to login user and dispatches to authReducer
  await axios
    .post("api/authentication", body, config)
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUserData());
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      if (err.response.data.errors) {
        console.log(err.response.data.errors);
      }
    });
};
