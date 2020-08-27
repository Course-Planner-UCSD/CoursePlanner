import React, { Fragment } from "react";

import "./App.css";

import CreateAccount from "./components/auth/Register";
import MyNavBar from "./components/auth/navBar";


function App() {
  return (
    <Fragment>
	  <MyNavBar/>
      <CreateAccount/>
    </Fragment>
  );
}

export default App;
