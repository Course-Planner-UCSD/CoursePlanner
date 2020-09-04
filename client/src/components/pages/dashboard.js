import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
const Dashboard = ({ userAuth, token }) => {
  const [tableData, setTableData] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Date Created", field: "createdDate" },
      { title: "Date Modified", field: "modifiedDate" },
    ],
  });

  useLayoutEffect(() => {
    if (userAuth) {
      loadTableData();
    }
  }, [userAuth]);

  const loadTableData = async () => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    var coursePlanData = await axios
      .get("/api/coursePlan/allPlansByID", config)
      .catch((err) => console.error(err));
    var coursePlanIDObjects = coursePlanData.data;
    var allIDs = [];
    coursePlanIDObjects.forEach((planID) => {
      allIDs.push(planID._id);
    });

    var currentData = [];
    for (var i = 0; i < allIDs.length; i++) {
      var url = "/api/coursePlan/getPlan/" + allIDs[i];
      var planData = await axios
        .get(url, config)
        .catch((err) => console.error(err));

      currentData.push({
        name: planData.data[0].name,
        createdDate: planData.data[0].createdDate,
        modifiedDate: planData.data[0].modifiedDate,
      });
    }

    setTableData({
      ...tableData,
      data: currentData,
    });

    return currentData;
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="table">
      <MaterialTable
        title="Course Plans"
        columns={tableData.columns}
        data={tableData.data}
        options={{
          headerStyle: {
            fontSize: 25,
          },
          rowStyle: {
            fontSize: 20,
          },
        }}
      />
    </div>
  );
};
Dashboard.propTypes = {
  token: PropTypes.string,
  userAuth: PropTypes.bool,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  token: state.authReducer.token,
});

export default connect(stateToProps)(Dashboard);
