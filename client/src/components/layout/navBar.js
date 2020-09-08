import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../App.css";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "./myTheme.component";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import { logout } from "../../Redux/actions/logout";
const navBar = ({ userAuth, logout }) => {
  const logoutAction = () => {
    logout({ msg: "logout" });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar position="static" id="testAppBar" bgcolor="primary.main">
        <Toolbar>
          {userAuth === false ? (
            <div>
              <Link to="/" className="links">
                <Button color="inherit">Course Planner</Button>
              </Link>
            </div>
          ) : (
            <div id="loggedInHeader">
              <Link to="/dashboard" className="links">
                <Button color="inherit">Course Planner</Button>
              </Link>
              <Link to="/login" className="links">
                <Button color="inherit" onClick={logoutAction}>
                  Logout
                </Button>
              </Link>
            </div>
          )}
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
