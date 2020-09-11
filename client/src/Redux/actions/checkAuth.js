import axios from "axios";
import { CHECK_AUTH, AUTH_ERROR } from "../../other/types";

export const checkAuth = () => async (dispatch) => {
  //set the send token to the local storage token

  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };

  //gets the user data and dispatches it to the state
  await axios
    .get("api/checkAuth", config)
    .then((response) =>
      dispatch({
        type: CHECK_AUTH,
      })
    )
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      console.log(err);
    });
};
