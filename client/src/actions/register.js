import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { loadUser } from "./loadUser";

export const register = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const response = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: REGISTER_FAIL,
    });
    if (errors) {
      console.log(errors);
    }
  }
};
