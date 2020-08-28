import React, { Component } from "react";
import "../../App.css";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "./myTheme.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CreateAccount from "../auth/Register";
import Toolbar from "@material-ui/core/Toolbar";

export default class MyNavBar extends Component {
  constructor(props) {
    super(props);

    this.setNavBar = this.setNavBar.bind(this);

    this.state = {
      navBarValue: 0,
    };
  }

  setNavBar(event, newValue) {
    this.setState({ navBarValue: newValue });
  }
  render() {
    return (
      <ThemeProvider theme={myTheme}>
        <AppBar position="static">
          <Toolbar>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              onChange={this.setNavBar}
              aria-label="disabled tabs example"
            >
              <Tab label="Course Planner" />
              <Tab label="View Saved" />
            </Tabs>
            <Button color="inherit" id="testButton">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}
