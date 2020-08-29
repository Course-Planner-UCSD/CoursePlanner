import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/navBar";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadUserData } from "./actions/loadUser";

const originalState = {};

const thunkMiddleware = [thunk];

const store = createStore(
  rootReducer,
  originalState,
  composeWithDevTools(applyMiddleware(...thunkMiddleware))
);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUserData());
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
