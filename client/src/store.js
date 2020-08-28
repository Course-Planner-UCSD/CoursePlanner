import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const originalState = {};

const thunkMiddleware = [thunk];

const store = createStore(
  rootReducer,
  originalState,
  composeWithDevTools(applyMiddleware(...thunkMiddleware))
);
export default store;
