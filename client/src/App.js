import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
//import store from "./store";
import "./App.css";
import store from "./store";
import Register from "./components/auth/Register";
import MyNavBar from "./components/layout/navBar";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <MyNavBar />
          <Switch>
            <Route exact path="/" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
