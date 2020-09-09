import axios from "axios";
import { LOADED_USER, AUTH_ERROR } from "../../other/types";

export const loadUserData = () => async (dispatch) => {
  //set the send token to the local storage token
  var config = {};
  if (localStorage.token) {
    config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
  }

  //gets the user data and dispatches it to the state
  await axios
    .get("api/userData", config)
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
