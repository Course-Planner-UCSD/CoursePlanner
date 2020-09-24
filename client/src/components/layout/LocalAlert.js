import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { deleteAlert } from "../../Redux/actions/plan";

const LocalAlert = ({ alert, deleteAlert }) => {
  if (alert.length > 0) {
    var returnAlerts = alert.map((currentAlert, index) => {
      return (
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
    return <Fragment></Fragment>;
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
