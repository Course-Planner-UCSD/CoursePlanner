import React, { useLayoutEffect, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment";
import "../../App.css";

const Plan = ({ userAuth, token, planData }) => {
  let { planID } = useParams();
  const [data, setData] = useState({
    columns: [{ title: "Courses", field: "course" }],
    planIndex: null,
  });
  useLayoutEffect(() => {
    determinePlanIndex();
  }, [planData]);

  const determinePlanIndex = () => {
    var finalIndex = 0;
    planData.forEach((currentPlan, index) => {
      if (currentPlan._id == planID) {
        finalIndex = index;
      }
    });
    console.log(planID);
    setData({
      ...data,
      planIndex: finalIndex,
    });
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {data.planIndex != null ? (
        <Fragment>
          <h1>{planData[data.planIndex].name}</h1>
          <div className="plan">
            <MaterialTable
              title="Fall"
              columns={data.columns}
              data={planData[data.planIndex].firstYear.quarters[0].courses}
              options={{
                search: false,
                tableLayout: "auto",
              }}
            />
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};
Plan.propTypes = {
  token: PropTypes.string,
  userAuth: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  token: state.authReducer.token,
  planData: state.authReducer.planData,
});

export default connect(mapStateToProps)(Plan);
