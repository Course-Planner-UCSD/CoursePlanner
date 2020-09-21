import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { deleteAlert } from "../../Redux/actions/plan";

const LocalAlert = ({ alert, deleteAlert }) => {
  const [state, setState] = useState({
    rerenderCount: 0,
    firstRender: true,
  });

  var updateStateInterval;

  useEffect(() => {
    return () => {
      clearInterval(updateStateInterval);
    };
  }, []);

  if (alert.length > 0) {
    if (state.firstRender) {
      updateStateInterval = setInterval(() => {
        setState({ ...state, rerenderCount: Date.UTC, firstRender: false });
      }, 1000);
    }
    var returnAlerts = [];
    alert.map((currentAlert, index) => {
      returnAlerts.push(
        <Alert
          onClose={() => {
            document.getElementById(index).style.display = "none";
            deleteAlert(currentAlert.quarterNum, currentAlert.year);
          }}
          severity={currentAlert.severity}
          key={index}
          className="planAlert"
          id={index}
        >
          {currentAlert.message}
        </Alert>
      );
    });
    return returnAlerts;
  } else {
    if (state.firstRender) {
      updateStateInterval = setInterval(() => {
        setState({ ...state, rerenderCount: Date.UTC, firstRender: false });
      }, 1000);
    }
    return <div></div>;
  }
};
LocalAlert.propTypes = {
  alert: PropTypes.array.isRequired,
  deleteAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  alert: state.planReducer.alert,
});
export default connect(mapStateToProps, { deleteAlert })(LocalAlert);
