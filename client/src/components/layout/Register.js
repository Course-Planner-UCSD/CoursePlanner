import React, { Component } from "react";
import axios from "axios";
import "../../App.css";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    //Allows us to use this in these methods to refer to the class CreateExercises
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
	this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
	this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
	  passwordConfirm: "",
	  name: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
    var emailProblemText = document.getElementById("emailProblem");
	emailProblemText.innerHTML = "";
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
    var pwProblemText = document.getElementById("pwProblem");
	pwProblemText.innerHTML = "";
  }

  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value,
    });
    var pwProblemText = document.getElementById("pwConfirmProblem");
	pwProblemText.innerHTML = "";
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //prevents default html form submit behavior

	var okInput = true;

	if (this.state.email.indexOf('@') <= 0 || this.state.email.indexOf('@') >= this.state.email.length - 1) {
		okInput = false;
		var emailProblemText = document.getElementById("emailProblem");
		emailProblemText.innerHTML = "Please enter a valid email.";
	}
	
	var pwOk = true;
	var currPW = this.state.password;
	var capLetter = false;
	var lowerLetter = false;
	var number = false;
	
	if (currPW < 8) {
		pwOk = false;
	} else {
		for (var i = 0; i < currPW.length; i++) {
			if (currPW.charAt(i) >= 'A' && currPW.charAt(i) <= 'Z') {
				capLetter = true;
			}
			if (currPW.charAt(i) >= 'a' && currPW.charAt(i) <= 'z') {
				lowerLetter = true;
			}
			if (currPW.charAt(i) >= '0' && currPW.charAt(i) <= '9') {
				number = true;
			}
		}
		if (!capLetter || !lowerLetter || !number) {
			pwOk = false;
		}
	}
	
	if (!pwOk) {
		okInput = false;
		var pwProblemText = document.getElementById("pwProblem");
		pwProblemText.innerHTML = "Please enter a valid password. A valid password is over 8 characters long and has at least one capital letter, at least one lower case letter, and at least one number.";
	}
	
	if (this.state.password != this.state.passwordConfirm) {
		okInput = false;
		var pwProblemText = document.getElementById("pwConfirmProblem");
		pwProblemText.innerHTML = "Please enter the same password for both fields.";
	}
	
	if (okInput) {
		const user = {
	      email: this.state.email,
	      password: this.state.password,
		  name: this.state.name
	    };
	
	    this.setState({
	      email: "",
	      password: "",
		  passwordConfirm: "",
		  name: ""
	    });
	
	    console.log(user);
	
	    //Send post request to the database
	    
	}
    
  }

  render() {
    return (
      <div id="myBackground">
        <div className="header">
          <h2 className="text" id="headerText">
            Create Account
          </h2>
        </div>
        <div id="formDiv">
          <form onSubmit={this.onSubmit} id="form">
			<h2 className="text" id="headerText">Create Account</h2>
            <div className="form-group" id="formInput">
				<input
	              type="text"
	              required
	              className="form-control"
	              value={this.state.name}
				  placeholder="Name"
                  onChange={this.onChangeName}
                  className="spaceBelow input"
                />
                <input
	              type="text"
	              required
	              className="form-control"
	              value={this.state.email}
				  placeholder="Email"
                  onChange={this.onChangeEmail}
                  className="input"
                />
				<p class="problemText" id="emailProblem"></p>
                <input
                  type="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  className="input"
				  placeholder="Password"
                />
				<p class="problemText" id="pwProblem"></p>
 				<input
                  type="password"
                  required
                  className="form-control"
                  value={this.state.passwordConfirm}
                  onChange={this.onChangePasswordConfirm}
                  className="input"
				  placeholder="Confirm Password"
                />
				<p class="problemText" id="pwConfirmProblem"></p>
            </div>
            <div className="form-group">
              <button type="submit" className="myButton">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
