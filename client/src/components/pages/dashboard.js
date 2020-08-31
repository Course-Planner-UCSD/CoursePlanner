import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = ({ userAuth }) => {
  if (!userAuth) {
    return <Redirect to="/" />;
  }
  return <h1>Dashboard</h1>;
};
Dashboard.propTypes = {
  register: PropTypes.func.isRequired,
  userAuth: PropTypes.bool,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
});

export default connect(stateToProps)(Dashboard);
