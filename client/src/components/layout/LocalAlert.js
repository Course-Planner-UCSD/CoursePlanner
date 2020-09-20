import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const LocalAlert = ({ alert }) => {
  const [state, setState] = useState({
    rerenderCount: 0,
    firstRender: true,
  });
  if (alert.length > 0) {
    if (state.firstRender) {
      setInterval(() => {
        setState({ ...state, rerenderCount: Date.UTC, firstRender: false });
      }, 1000);
    }
    var returnAlerts = [];
    alert.map((currentAlert, index) => {
      returnAlerts.push(
        <Alert
          severity={currentAlert.severity}
          key={index}
          className="planAlert"
        >
          {currentAlert.message}
        </Alert>
      );
    });
    return returnAlerts;
  } else {
    if (state.firstRender) {
      setInterval(() => {
        setState({ ...state, rerenderCount: Date.UTC, firstRender: false });
      }, 1000);
    }
    return <div></div>;
  }
};
Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alert: state.planReducer.alert,
});
export default connect(mapStateToProps)(LocalAlert);
