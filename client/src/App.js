import React, { Fragment } from "react";

import "./App.css";
import CreateAccount from "./components/register";

function App() {
  return (
    <Fragment>
      <div>Course Planner</div>
      <CreateAccount />
    </Fragment>
  );
}

export default App;
