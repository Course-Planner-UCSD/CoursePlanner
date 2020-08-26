import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../App.css";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    //Allows us to use this in these methods to refer to the class CreateExercises
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
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

  onSubmit(e) {
    e.preventDefault(); //prevents default html form submit behavior

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      email: "",
      password: "",
    });

    console.log(user);

    //Send post request to the database. Replaces the postman stuff
    axios
      .post("http://localhost:5000/", user)
      .then((res) => console.log(res.data));
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
            <div className="form-group" id="formInput">
              <div id="labels">
                <label className="spaceBelow text">Email: </label>
                <label className="spaceBelow text">Password: </label>
              </div>
              <div id="inputs">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  className="spaceBelow input"
                />
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  className="spaceBelow input"
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="myButton">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}