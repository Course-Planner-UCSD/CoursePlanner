import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../Redux/actions/register";
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

const Register = ({ register, userAuth, error }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    triedEmail: false,
    triedPW: false,
    triedConfirmPW: false,
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    email,
    password,
    passwordConfirm,
    triedEmail,
    triedPW,
    triedConfirmPW,
    showPassword,
    showConfirmPassword,
  } = formData;

  useEffect(() => {
    var button = document.getElementById("register");
    button.addEventListener("animationend", animationOver, false);
  }, []);

  const onChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onChangePasswordConfirm = (e) => {
    setFormData({ ...formData, passwordConfirm: e.target.value });
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
    if (!triedPW) {
      return false;
    }
    var currPW = password;
    var capLetter = false;
    var lowerLetter = false;
    var number = false;

    if (currPW.length < 8) {
      return true;
    } else {
      for (var i = 0; i < currPW.length; i++) {
        if (currPW.charAt(i) >= "A" && currPW.charAt(i) <= "Z") {
          capLetter = true;
        }
        if (currPW.charAt(i) >= "a" && currPW.charAt(i) <= "z") {
          lowerLetter = true;
        }
        if (currPW.charAt(i) >= "0" && currPW.charAt(i) <= "9") {
          number = true;
        }
      }
      if (!capLetter || !lowerLetter || !number) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkConfirmPassword = () => {
    if (!triedConfirmPW) {
      return false;
    }
    if (password !== passwordConfirm) {
      return true;
    } else {
      return false;
    }
  };

  const emailTried = () => {
    //triedName = true;
    setFormData({ ...formData, triedEmail: true });
  };

  const pwTried = () => {
    //triedName = true;
    setFormData({ ...formData, triedPW: true });
  };

  const confirmPWTried = () => {
    setFormData({ ...formData, triedConfirmPW: true });
  };

  const animationOver = () => {
    var button = document.getElementById("register");
    button.classList.remove("shaking");
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setFormData({ ...formData, showConfirmPassword: !showConfirmPassword });
  };

  const onSubmit = (e) => {
    //prevents default html form submit behavior
    e.preventDefault();

    var button = document.getElementById("register");

    if (
      !triedEmail ||
      checkEmail() ||
      !triedPW ||
      checkPassword() ||
      !triedConfirmPW ||
      checkConfirmPassword()
    ) {
      button.classList.add("shaking");

      setFormData({
        ...formData,
        triedEmail: true,
        triedPW: true,
        triedConfirmPW: true,
      });
    } else {
      //Send register command to register action
      register({ email, password }).then(() => {
        if (!userAuth) {
          //alert:
          //setFormData({ ...formData, loginErrors: error });
          try {
            document.getElementById("badLoginAlert").style.display = "flex";
          } catch {
            //Alert isn't on the page right now
          }
          //animation:
          try {
            button.classList.add("shaking");
          } catch {
            //button isn't on the page right now
          }
        }
      });
    }
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
            {error}
          </Alert>
          <Card id="testCard">
            <h2 className="text" id="headerText">
              Create Account
            </h2>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <div id="form-inputs">
                <Box pb={1.87} width="100%">
                  <TextField
                    id="emailInput"
                    required
                    error={checkEmail()}
                    helperText={
                      checkEmail() ? "Please enter a valid email" : ""
                    }
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
                      {checkPassword()
                        ? "Please enter a valid password. A valid password is over 8 characters long and has at least one capital letter, at least one lower case letter, and at least one number."
                        : ""}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box pb={1.87} width="100%">
                  <FormControl variant="outlined" fullWidth={true}>
                    <InputLabel error={checkConfirmPassword()}>
                      Confirm Password *
                    </InputLabel>
                    <OutlinedInput
                      id="confirmPWInput"
                      type={showConfirmPassword ? "text" : "password"}
                      error={checkConfirmPassword()}
                      onChange={onChangePasswordConfirm}
                      onBlur={confirmPWTried}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={145}
                    />
                    <FormHelperText id="confirmPWWarning">
                      {checkConfirmPassword()
                        ? "Please enter the same password for both fields."
                        : ""}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  id="register"
                >
                  Register
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  userAuth: PropTypes.bool,
  error: PropTypes.string,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  error: state.authReducer.error,
});

export default connect(stateToProps, { register })(Register);
