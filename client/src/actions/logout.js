import { LOGOUT } from "../other/types";

export const logout = ({ msg }) => (dispatch) => {
  console.log(msg);
  dispatch({
    type: LOGOUT,
  });
};
