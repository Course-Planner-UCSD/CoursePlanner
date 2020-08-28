import React, { Component, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/register";
import PropTypes from "prop-types";
import "../../App.css";
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

const Register = (/*{ register, isAuthenticated }*/) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    triedEmail: false,
    triedName: false,
    triedPW: false,
    triedConfirmPW: false,
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    email,
    password,
    passwordConfirm,
    name,
    triedEmail,
    triedName,
    triedPW,
    triedConfirmPW,
    showPassword,
    showConfirmPassword,
  } = formData;

  useEffect(() => {
    var button = document.getElementById("register");
    button.addEventListener("animationend", animationOver, false);
  });

  const onChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onChangePasswordConfirm = (e) => {
    setFormData({ ...formData, passwordConfirm: e.target.value });
  };

  const onChangeName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const checkName = () => {
    return triedName && name.length === 0;
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

  const nameTried = () => {
    //triedName = true;
    setFormData({ ...formData, triedName: true });
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
    e.preventDefault(); //prevents default html form submit behavior

    var button = document.getElementById("register");

    if (
      !triedName ||
      checkName() ||
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
        triedName: true,
        triedEmail: true,
        triedPW: true,
        triedConfirmPW: true,
      });
    } else {
      const user = {
        email: email,
        password: password,
        name: name,
      };

      setFormData({
        ...formData,
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        triedEmail: false,
        triedName: false,
        triedPW: false,
        triedConfirmPW: false,
        showPassword: false,
        showConfirmPassword: false,
      });

      //pwInput.value = "";
      //confirmPWInput.value = "";

      console.log(user);

      //Send post request to the database

      window.location.reload();
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <div id="myBackground">
        <Card id="testCard">
          <h2 className="text" id="headerText">
            Create Account
          </h2>
          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <div id="form-inputs">
              <Box pb={15} width="100%">
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
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {<Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box pb={15} width="100%">
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
              <Box pb={15} width="100%">
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
    </ThemeProvider>
  );
};
export default Register;
