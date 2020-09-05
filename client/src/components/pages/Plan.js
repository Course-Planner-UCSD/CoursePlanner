import React, { useLayoutEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import moment from "moment";
import "../../App.css";

const Plan = ({ userAuth, token }) => {
  let { planID } = useParams();

  const [data, setData] = useState({
    planData: {},
    columns: [{ title: "Courses", field: "course" }],
    firstYear: {
      quarters: [{}],
    },
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
        var test = result.data[0];
        test.firstYear.quarters[0].courses.forEach((element) => {
          delete element._id;
        });
        setData({ planData: test });
      })
      .catch((err) => console.error(err));
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  //add button here to console log the planData quarters and courses arrays
  return (
    <Fragment>
      <h1>{data.planData.name}</h1>
      <div className="plan">
        <MaterialTable title="Fall" columns={data.columns} />
      </div>
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
