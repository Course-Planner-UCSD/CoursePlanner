import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

const ModifiedDate = ({ planIndex, planData }) => {
  const [data, setData] = useState({
    lastModified: null,
  });

  useEffect(() => {
    initialState();
    var interval = setInterval(() => {
      initialState();
    }, 500);

    return () => {
      clearInterval(interval);
    };
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

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps)(ModifiedDate);
