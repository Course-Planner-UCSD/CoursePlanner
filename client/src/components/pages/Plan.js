import React, { useLayoutEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";

const Plan = ({ userAuth, token }) => {
  let { planID } = useParams();

  const [data, setData] = useState({
    planData: {},
  });
  useLayoutEffect(() => {
    getPlanData();
  }, [data]);

  const getPlanData = async () => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    var url = "/api/coursePlan/getPlan/" + planID;
    await axios
      .get(url, config)
      .then((result) => {
        setData({ planData: result.data[0] });
      })
      .catch((err) => console.error(err));
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1>Plan ID: {planID}</h1>
      <h1>Plan Name: {data.planData.name}</h1>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  token: state.authReducer.token,
});
Plan.propTypes = {
  token: PropTypes.string,
  userAuth: PropTypes.bool,
};

export default connect(mapStateToProps)(Plan);
