import axios from "axios";
import { REGISTER, AUTH_ERROR } from "../../other/types";

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
      const payload = {
        token: response.data.token,
        email: email,
      };

      dispatch({
        type: REGISTER,
        payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      console.error(err);
    });
};
