import React, { Fragment } from "react";

import "./App.css";
import CreateAccount from "./components/layout/Register";
import MyNavBar from "./components/layout/navBar";
function App() {
  return (
    <Fragment>
	  <MyNavBar/>
      <CreateAccount/>
    </Fragment>
  );
}

export default App;
