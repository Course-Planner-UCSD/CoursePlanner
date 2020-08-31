import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/navBar";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadUserData } from "./actions/loadUser";
import Dashboard from "./components/pages/dashboard";
import Landing from "./components/pages/landing";

const originalState = {};

const thunkMiddleware = [thunk];

const store = createStore(
  rootReducer,
  originalState,
  composeWithDevTools(applyMiddleware(...thunkMiddleware))
);

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUserData());
    }
  });
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
