import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

const ModifiedDate = ({ planIndex, planData }) => {
  const [data, setData] = useState({
    lastModified: null,
  });

  useEffect(() => {
    initialState();
    setInterval(() => {
      initialState();
    }, 500);
  }, [planData]);

  const initialState = () => {
    setData({
      ...data,
      lastModified: moment(planData[planIndex].modifiedDate).format(
        "MMMM Do, h:mm a"
      ),
    });
  };

  return <h3>Modified On: {data.lastModified}</h3>;
};

ModifiedDate.propTypes = {
  updatePlan: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps)(ModifiedDate);
