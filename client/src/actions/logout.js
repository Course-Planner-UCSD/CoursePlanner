import { LOGOUT } from "../other/types";

export const logout = ({ msg }) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
