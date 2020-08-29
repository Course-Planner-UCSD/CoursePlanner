import axios from "axios";
import { REGISTER_SUCCESS, AUTH_ERROR } from "../other/types";
import { loadUserData } from "./loadUser";

export const register = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  //sends post request to register user and dispatches to authReducer
  await axios
    .post("api/register", body, config)
    .then((response) => {
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
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
