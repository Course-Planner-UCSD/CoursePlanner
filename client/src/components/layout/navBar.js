import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../App.css";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "./myTheme.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
//import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import { logout } from "../../actions/logout";
const navBar = ({ userAuth, logout }) => {
  const logoutAction = () => {
    logout({ msg: "logout" });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
          >
            {userAuth === false ? (
              <div>
                <Link to="/">
                  <Tab label="Course Planner" />
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/dashboard">
                  <Tab label="Course Planner" />
                </Link>
                <Link to="/login">
                  <Tab onClick={logoutAction} label="Logout" />
                </Link>
              </div>
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
navBar.propTypes = {
  logout: PropTypes.func.isRequired,
  userAuth: PropTypes.bool,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
});

export default connect(stateToProps, { logout })(navBar);
