import axios from "axios";
import setToken from "../other/setToken";
import { LOADED_USER, AUTH_ERROR } from "../other/types";

export const loadUserData = () => async (dispatch) => {
  //set the send token to the local storage token
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  //gets the user data and dispatches it to the state
  await axios
    .get("api/userData")
    .then((response) =>
      dispatch({
        type: LOADED_USER,
        payload: response.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      console.log(err);
    });
};
