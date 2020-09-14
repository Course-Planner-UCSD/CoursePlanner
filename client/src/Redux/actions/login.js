import axios from "axios";
import { LOGIN, AUTH_ERROR } from "../../other/types";

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  await axios
    .post("api/authentication", body, config)
    .then((response) => {
      const payload = {
        token: response.data.token,
      };
      dispatch({
        type: LOGIN,
        payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data,
      });
    });
};
