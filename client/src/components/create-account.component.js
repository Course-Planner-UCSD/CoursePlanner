import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';

export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
		
		//Allows us to use this in these methods to refer to the class CreateExercises
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			email: '',
			password: ''
		}
	}
	
	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}
	
	onChangePassword(e) {
		this.setState({
			password: e.target.value
		})
	}
	
	onSubmit(e) {
		e.preventDefault();//prevents default html form submit behavior
		
		const user = {
			email: this.state.email,
			password: this.state.password
		}
		
		this.setState({
			email: '',
			password: ''
		})
		
		console.log(user);
		
		//Send post request to the database. Replaces the postman stuff
		axios.post('http://localhost:5000/', user)
			.then(res => console.log(res.data));
	}
	
	render() {
		const teststyle = {
	      	backgroundColor: "#5ba1e6",
			padding: "7px",
			color: "white",
			textAlign: "center",
			marginBottom: "20px",
	    };
		const formItems = {
			marginBottom: "10px"
		}
		const formStyle = {
			textAlign: "center"
		}
		const buttonStyle = {
			backgroundColor: "#5ba1e6",
			border: "none",
			fontSize: "16px",
			fontFamily:"Helvetica",
			cursor: "pointer"
		}
		const textStyle = {
			color: "black",
			fontFamily:"Helvetica"
		}
		return (
			<div>
				<div style={teststyle}>
				<h2 class="header-text" style={textStyle}>Create Account</h2>
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group" style={formStyle}>
						<div id="email" style={formItems}>
						<label style={textStyle}>Email: </label>
						<input type="text"
							required
							className="form-control"
							value={this.state.email}
							onChange={this.onChangeEmail}
							/>
						</div>
						<br/>
						<div id="password" style={formItems}>
						<label style={textStyle}>Password: </label>
						<input type="text"
							required
							className="form-control"
							value={this.state.password}
							onChange={this.onChangePassword}
							/>
						</div>
					</div>
					<div className="form-group" style={formStyle}>
						<button type="submit" style={buttonStyle}>Create Account</button>
					</div>
				</form>
			</div>
		)
	}
}