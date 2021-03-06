import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
import moment from "moment";
import { plan, planTotalUnits } from "../../Redux/actions/plan";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "../layout/myTheme.component";
var newPlan = require("../../other/newPlan.json");

const Dashboard = ({ userAuth, token, plan, planTotalUnits }) => {
  const [tableData, setTableData] = useState({
    columns: [
      { title: "Name", field: "name", defaultSort: "asc" },
      {
        title: "Start Year",
        field: "startYear",
        type: "numeric",
        align: "left",
        editable: "never",
      },
      {
        title: "Number of Years",
        field: "years",
        editable: "never",
      },
      { title: "Date Created", field: "createdDate", editable: "never" },
      {
        title: "Date Modified",
        field: "modifiedDate",
        editable: "never",
      },
      {
        title: "Date Last Opened",
        field: "lastOpened",
        editable: "never",
      },
    ],
    viewPlan: false,
    redirectURL: "",
    viewPlanID: "",
    data: [],
  });

  useLayoutEffect(() => {
    if (userAuth) {
      loadTableData();
      planTotalUnits(null, null);
      plan();
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
      var year = 0;
      if (planData.data[0].showFifthYear) {
        year = 5;
      } else {
        year = 4;
      }
      currentData.push({
        name: planData.data[0].name,
        createdDate: moment(planData.data[0].createdDate).format(
          "MMMM Do, h:mm a"
        ),
        modifiedDate: moment(planData.data[0].modifiedDate).format(
          "MMMM Do, h:mm a"
        ),
        lastOpened: moment(planData.data[0].lastOpened).format(
          "MMMM Do, h:mm a"
        ),
        planID: planData.data[0]._id,
        years: year,
        startYear: planData.data[0].startYear,
      });
    }

    setTableData({
      ...tableData,
      data: currentData,
    });

    return currentData;
  };

  const deletePlan = async (rowData) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    var url = "/api/coursePlan/deletePlan/" + rowData.planID;
    await axios.delete(url, config).catch((err) => console.error(err));
    plan();
    loadTableData();
  };

  const addPlan = async (newData) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    var url = "/api/coursePlan/createPlan";
    var newPlanID;
    await axios
      .get(url, config)
      .then((result) => {
        newPlanID = result.data;
      })
      .catch((err) => console.error(err));

    const updateConfig = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    if (newData.name === undefined) {
      newData.name = "Course Plan";
    }

    newData.startYear = moment().year();

    const body = JSON.stringify({
      name: newData.name,
      startYear: newData.startYear,
    });

    var updateURL = "/api/coursePlan/updatePlan/" + newPlanID;

    await axios
      .post(updateURL, newPlan, updateConfig)
      .catch((err) => console.error(err));

    await axios
      .post(updateURL, body, updateConfig)
      .then(loadTableData())
      .catch((err) => console.error(err));
    plan();
  };

  const viewPlan = async (rowData) => {
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    var url = "/api/coursePlan/updatePlan/" + rowData.planID;
    var currentTime = moment().toISOString();
    var body = JSON.stringify({ lastOpened: currentTime });

    await axios.post(url, body, config).catch((err) => console.error(err));
    var newURL = "/plan/" + rowData.planID;
    setTableData({
      ...tableData,
      viewPlan: true,
      redirectURL: newURL,
      viewPlanID: rowData.planID,
    });
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  if (tableData.viewPlan) {
    return <Redirect to={tableData.redirectURL} />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <div id="myBackground">
        <div className="dashboard">
          <MaterialTable
            title="Course Plans"
            columns={tableData.columns}
            data={tableData.data}
            options={{
              headerStyle: {
                fontSize: 22,
              },
              rowStyle: {
                fontSize: 20,
              },
              tableLayout: "auto",
              draggable: false,
              pageSize: 10,
              pageSizeOptions: [5, 10],
              showEmptyDataSourceMessage: false,
              paginationType: "stepped",
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "View and Edit course plan",
                onClick: (event, rowData) => viewPlan(rowData),
              },
            ]}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    deletePlan(oldData);
                    resolve();
                  }, 1000);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    addPlan(newData);
                    resolve();
                  }, 1000);
                }),
            }}
            localization={{
              body: {
                editRow: {
                  deleteText:
                    "Are you sure you want to delete this Course Plan?",
                },
                emptyDataSourceMessage: "No Course Plans to display",
              },
              toolbar: {
                searchPlaceholder: "Search Course Plans",
              },
              header: {
                actions: "",
              },
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};
Dashboard.propTypes = {
  token: PropTypes.string,
  userAuth: PropTypes.bool,
  plan: PropTypes.func.isRequired,
  planTotalUnits: PropTypes.func.isRequired,
};

const stateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  token: state.authReducer.token,
});

export default connect(stateToProps, { plan, planTotalUnits })(Dashboard);
