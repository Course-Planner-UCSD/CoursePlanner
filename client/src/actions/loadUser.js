import axios from "axios";
import setToken from "../other/setToken";
import { LOADED_USER, AUTH_ERROR } from "./types";

export const loadUser = () => async (dispatch) => {
  //set the send token to the local storage token
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    //gets the user data and dispatches it to the state
    const response = await axios.get("/api/auth");

    dispatch({
      type: LOADED_USER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    console.log(err);
  }
};
