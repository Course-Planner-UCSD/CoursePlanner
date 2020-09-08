import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/login";
import PropTypes from "prop-types";
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

const Login = ({ loginUser, userAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    triedEmail: false,
    triedPW: false,
    showPassword: false,
    badLogin: false,
  });
  const { email, password, triedEmail, showPassword } = formData;

  useEffect(() => {
    var button = document.getElementById("login");
    button.addEventListener("animationend", animationOver, false);
  }, []);

  const onChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const checkEmail = () => {
    if (!triedEmail) {
      return false;
    }

    if (email.indexOf("@") <= 0 || email.indexOf("@") >= email.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const checkPassword = () => {
    return false;
  };

  const emailTried = () => {
    //triedName = true;
    setFormData({ ...formData, triedEmail: true });
  };

  const pwTried = () => {
    //triedName = true;
    setFormData({ ...formData, triedPW: true });
  };

  const animationOver = () => {
    var button = document.getElementById("login");
    button.classList.remove("shaking");
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const onSubmit = (e) => {
    //prevents default html form submit behavior
    e.preventDefault();

    //Send login command to login action
    loginUser({ email, password }).then(() => {
      if (!userAuth) {
        //alert:
        try {
          document.getElementById("badLoginAlert").style.display = "flex";
        } catch {
          //Alert isn't on the page right now
        }
        //animation:
        try {
          document.getElementById("login").classList.add("shaking");
        } catch {
          //button isn't on the page right now
        }
      }
    });
  };

  if (userAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <div id="myBackground">
	  <div id="mainContainer">
        <Alert
          onClose={() => {
            document.getElementById("badLoginAlert").style.display = "none";
          }}
          severity="error"
          id="badLoginAlert"
        >
          Incorrect username or password
        </Alert>
        <Card id="testCard">
          <h2 className="text" id="headerText">
            Login
          </h2>
          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <div id="form-inputs">
              <Box pb={1.87} width="100%">
                <TextField
                  id="emailInput"
                  required
                  error={checkEmail()}
                  helperText={checkEmail() ? "Please enter a valid email" : ""}
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={onChangeEmail}
                  fullWidth={true}
                  onBlur={emailTried}
                />
              </Box>
              <Box pb={1.87} width="100%">
                <FormControl variant="outlined" fullWidth={true}>
                  <InputLabel error={checkPassword()}>Password *</InputLabel>
                  <OutlinedInput
                    id="pwInput"
                    type={showPassword ? "text" : "password"}
                    error={checkPassword()}
                    onChange={onChangePassword}
                    onBlur={pwTried}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={85}
                  />
                  <FormHelperText id="pwWarning">
                    {checkPassword() ? "Please enter a password" : ""}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                id="login"
              >
                Login
              </Button>
            </div>
          </form>
        </Card>
      </div>
	</div>
    </ThemeProvider>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  userAuth: PropTypes.bool,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
});

export default connect(stateToProps, { loginUser })(Login);
