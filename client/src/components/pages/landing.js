import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";


import "../../materialize.css";
import "../../materialize.min.css";
import "../../style.css";

const Landing = ({ userAuth }) => {
  if (userAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
    <div class="container">

      <h1>Course Planner</h1>
      <Link to="/register" >
      <div class="col s6">
        <h1 class="card-panel">Register</h1>
      </div>
      </Link>
      <Link to="/login">
      <div class="col s6">
        <h1 class="card-panel">Login</h1>
      </div>
      </Link>
      </div>
    </Fragment>
  );
};
Landing.propTypes = {
  userAuth: PropTypes.bool,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
});

export default connect(stateToProps)(Landing);
