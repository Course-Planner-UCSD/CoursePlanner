import React, {Component} from 'react';
import { Button} from 'react-bootstrap';
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
			marginBottom: "10px",
			display: "table-row"
		}
		const formStyle = {
			textAlign: "center",
			marginLeft: "auto",
			marginRight: "auto",
			marginBottom: "20px",
			display: "table"
		}
		const buttonStyle = {
			backgroundColor: "#5ba1e6",
			border: "none",
			fontSize: "16px",
			fontFamily:"Helvetica",
			cursor: "pointer",
			padding: "5px"
		}
		const textStyle = {
			color: "black",
			fontFamily:"Helvetica",
		}
		const textStyleCell = {
			color: "black",
			fontFamily:"Helvetica",
			display: "table-cell",
			paddingRight: "10px"
		}
		const cell = {
			display: "table-cell"
		}
		return (
			<div>
				<div style={teststyle}>
				<h2 class="header-text" style={textStyle}>Create Account</h2>
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group" style={formStyle}>
						<div id="email" style={formItems}>
						<label style={textStyleCell}>Email: </label>
						<input type="text"
							required
							className="form-control"
							value={this.state.email}
							onChange={this.onChangeEmail}
							style={cell}/>
						</div>
						<br/>
						<div id="password" style={formItems}>
						<label style={textStyleCell}>Password: </label>
						<input type="text"
							required
							className="form-control"
							value={this.state.password}
							onChange={this.onChangePassword}
							style={cell}
							/>
						</div>
					</div>
					<div className="form-group" style={{textAlign: "center"}}>
						<button type="submit" style={buttonStyle}>Create Account</button>
					</div>
				</form>
			</div>
		)
	}
}