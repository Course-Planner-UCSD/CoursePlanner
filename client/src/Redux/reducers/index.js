import { combineReducers } from "redux";
import authReducer from "./authReducer";
import planReducer from "./planReducer";
export default combineReducers({
  authReducer,
  planReducer,
});
