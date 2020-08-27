import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
//import store from "./store";
import "./App.css";

import Register from "./components/auth/Register";
import MyNavBar from "./components/layout/navBar";

const App = () => {
  return (
    //<Provider store={store}>
    <Router>
      <Fragment>
        <MyNavBar />
        <Route exact path="/" component={Register} />
      </Fragment>
    </Router>
    //</Provider>
  );
};

export default App;
