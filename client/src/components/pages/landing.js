import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
=======
>>>>>>> temp
=======
>>>>>>> materialize a bit?
=======
>>>>>>> materialize a bit?
=======
>>>>>>> materialize a bit?
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "../layout/myTheme.component";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> materialize a bit?
=======

>>>>>>> materialize formatting
=======
>>>>>>> temp
=======
>>>>>>> materialize a bit?
=======

>>>>>>> materialize formatting
=======
>>>>>>> materialize a bit?
=======

>>>>>>> materialize formatting
=======
>>>>>>> materialize a bit?
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
