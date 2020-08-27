import React, { Component } from "react";
import "../../App.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { ThemeProvider } from '@material-ui/styles';
import myTheme from '../../myTheme.component';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    //Allows us to use this in these methods to refer to the class CreateExercises
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
	this.nameTried = this.nameTried.bind(this);
	this.emailTried = this.emailTried.bind(this);
	this.pwTried = this.pwTried.bind(this);
	this.confirmPWTried = this.confirmPWTried.bind(this);
	this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
	this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
	  triedEmail: false,
	  triedName: false,
	  triedPW: false,
	  triedConfirmPW: false,
	  showPassword: false,
	  showConfirmPassword: false
    };
  }

  componentDidMount() {
    var button = document.getElementById("register");
	button.addEventListener("animationend", this.animationOver,false);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  checkName() {
	return this.state.triedName && this.state.name.length === 0;
  }

  checkEmail() {
	if (!this.state.triedEmail) {
		return false;
	}
	var email = this.state.email;
	if (email.indexOf("@") <= 0 || email.indexOf("@") >= email.length - 1) {
	  return true;
    } else {
	  return false;
    }
  }
 
  checkPassword() {
	if (!this.state.triedPW) {
		return false;
	}
    var currPW = this.state.password;
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
  }

  checkConfirmPassword() {
	if (!this.state.triedConfirmPW) {
		return false;
	}
	if (this.state.password !== this.state.passwordConfirm) {
      return true;
    } else {
	  return false;
    }
  }

  nameTried() {
	//this.state.triedName = true;
	this.setState({triedName: true});
  }

  emailTried() {
	//this.state.triedName = true;
	this.setState({triedEmail: true});
  }

  pwTried() {
	//this.state.triedName = true;
	this.setState({triedPW: true});
  }

  confirmPWTried() {
	this.setState({triedConfirmPW: true});
  }

  animationOver() {
	var button = document.getElementById("register");
	button.classList.remove("shaking");
  }

  handleClickShowPassword() {
	this.setState({
		showPassword: !this.state.showPassword
	})
  }

  handleClickShowConfirmPassword() {
	this.setState({
		showConfirmPassword: !this.state.showConfirmPassword
	})
  }

  onSubmit(e) {
    e.preventDefault(); //prevents default html form submit behavior

	var button = document.getElementById("register");

	if (!this.state.triedName || this.checkName() ||
	!this.state.triedEmail || this.checkEmail() ||
	!this.state.triedPW || this.checkPassword() ||
	!this.state.triedConfirmPW || this.checkConfirmPassword()) {
		button.classList.add("shaking");
		
		this.setState({
			triedName: true,
			triedEmail: true,
			triedPW: true,
			triedConfirmPW: true,
		})
	} else {
		const user = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
        };

        this.setState({
          email: "",
          password: "",
          passwordConfirm: "",
          name: "",
		  triedEmail: false,
	      triedName: false,
	      triedPW: false,
	      triedConfirmPW: false,
		  showPassword: false,
		  showConfirmPassword: false
        });
		
		//pwInput.value = "";
		//confirmPWInput.value = "";

      	console.log(user);

      	//Send post request to the database

		window.location.reload();
	}
  }

  render() {
	
    return (
	<ThemeProvider theme={myTheme}>
      <div id="myBackground">
		<Card id="testCard">
		<h2 className="text" id="headerText">
          Create Account
        </h2>
        <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
			<div id="form-inputs">
			<Box pb={15} width="100%">
	  			<TextField
					id="nameInput" 
					required 
					error={this.checkName()} 
					helperText={this.checkName() ? "Please enter a name" : ""} 
					label="Name" 
					variant="outlined" 
					value={this.state.name} 
					onChange={this.onChangeName} 
					fullWidth={true}
					onBlur={this.nameTried}
				/>
			</Box>
			<Box pb={15} width="100%">
				<TextField 
					id="emailInput" 
					required 
					error={this.checkEmail()} 
					helperText={this.checkEmail() ? "Please enter a valid email" : ""} 
					label="Email" 
					variant="outlined" 
					value={this.state.email} 
					onChange={this.onChangeEmail} 
					fullWidth={true}
					onBlur={this.emailTried}
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
		          <InputLabel error={this.checkPassword()}>Password *</InputLabel>
		          <OutlinedInput
		            id="pwInput"
		            type={this.state.showPassword ? 'text' : 'password'}
					error={this.checkPassword()} 
		            onChange={this.onChangePassword}
					onBlur={this.pwTried}
		            endAdornment={
		              <InputAdornment position="end">
		                <IconButton
		                  onClick={this.handleClickShowPassword}
		                  edge="end"
		                >
		                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
		                </IconButton>
		              </InputAdornment>
		            } 
					labelWidth={85}
		          />
				  <FormHelperText id="pwWarning">{this.checkPassword() ? "Please enter a valid password. A valid password is over 8 characters long and has at least one capital letter, at least one lower case letter, and at least one number." : ""}</FormHelperText>
		        </FormControl>
			</Box>
			<Box pb={15} width="100%">
				<FormControl variant="outlined" fullWidth={true}>
		          <InputLabel error={this.checkConfirmPassword()}>Confirm Password *</InputLabel>
		          <OutlinedInput
		            id="confirmPWInput"
		            type={this.state.showConfirmPassword ? 'text' : 'password'}
					error={this.checkConfirmPassword()} 
		            onChange={this.onChangePasswordConfirm}
					onBlur={this.confirmPWTried}
		            endAdornment={
		              <InputAdornment position="end">
		                <IconButton
		                  onClick={this.handleClickShowConfirmPassword}
		                  edge="end"
		                >
		                  {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
		                </IconButton>
		              </InputAdornment>
		            } 
					labelWidth={145}
		          />
				  <FormHelperText id="confirmPWWarning">{this.checkConfirmPassword() ? "Please enter the same password for both fields." : ""}</FormHelperText>
		        </FormControl>
			</Box>
			<Button variant="contained" color="primary" type="submit" id="register">Register</Button>
			</div>
		</form>
		</Card>
      </div>
    </ThemeProvider>
    );
  }
}
