import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
const Landing = ({ userAuth }) => {
  if (userAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1>Landing</h1>
      <Link to="/register">
        <h1>Register</h1>
      </Link>
      <Link to="/login">
        <h1>Login</h1>
      </Link>
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
