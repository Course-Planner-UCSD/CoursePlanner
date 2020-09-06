import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
import { updatePlan } from "../../actions/plan";
import moment from "moment";
import "../../App.css";

const Plan = ({ userAuth, token, planData, updatePlan }) => {
  let { planID } = useParams();
  //TO DO: add units to db
  const [data, setData] = useState({
    columns: [
      { title: "Courses", field: "course" },
      { title: "Units", field: "units" },
    ],
    lastOpened: null,
    planIndex: null,
  });
  useEffect(() => {
    determinePlanIndex();
  }, [planData]);

  const determinePlanIndex = () => {
    //DO NOT try to get anything from planData here since the app will crash
    var finalIndex = 0;
    planData.forEach((currentPlan, index) => {
      if (currentPlan._id == planID) {
        finalIndex = index;
      }
    });

    setData({
      ...data,
      planIndex: finalIndex,
    });

    return finalIndex;
  };
  const updateTable = async (updates, year, quarterNum) => {
    var i = 0;
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    var currentPlanData;

    if (year === "firstYear") {
      currentPlanData = planData[data.planIndex].firstYear;
    }
    while (updates[i] != null) {
      for (
        var j = 0;
        j < currentPlanData.quarters[quarterNum].courses.length;
        j++
      ) {
        if (
          currentPlanData.quarters[quarterNum].courses[j].course ===
          updates[i].oldData.course
        ) {
          currentPlanData.quarters[quarterNum].courses[j].course =
            updates[i].newData.course;
          break;
        }
      }
      i++;
    }
    var firstYear = currentPlanData;
    var currentTime = moment().toISOString();
    var body = JSON.stringify({ firstYear, modifiedDate: currentTime });

    var url = "/api/coursePlan/updatePlan/" + planID;
    await axios
      .post(url, body, config)
      .catch((err) => console.error(err))
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      });
    var newOpen = moment(planData[data.planIndex].modifiedDate).format(
      "MMMM Do, h:mm a"
    );
    setData({ ...data, lastOpened: newOpen });
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }
  //for all initial rendering use planData and then use local state (data in this case) to render text dynamically
  return (
    <Fragment>
      {data.planIndex != null ? (
        <Fragment>
          <h1>{planData[data.planIndex].name}</h1>
          <h2>
            Date Last Modified:
            {data.lastOpened == null
              ? " " +
                moment(planData[data.planIndex].modifiedDate).format(
                  "MMMM Do, h:mm a"
                )
              : " " + data.lastOpened}
          </h2>
          <div className="plan">
            <MaterialTable
              title="Fall"
              columns={data.columns}
              data={(query) =>
                new Promise((resolve, reject) => {
                  var newData =
                    planData[data.planIndex].firstYear.quarters[0].courses;
                  var newDatalength =
                    planData[data.planIndex].firstYear.quarters[0].courses
                      .length;
                  resolve({
                    data: newData,
                    page: query.page,
                    totalCount: newDatalength,
                  });
                })
              }
              editable={{
                onBulkUpdate: (updates) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      updateTable(updates, "firstYear", 0);
                      resolve();
                    }, 1000);
                  }),
              }}
              options={{
                search: false,
                tableLayout: "auto",
                headerStyle: {
                  fontSize: 20,
                },
                rowStyle: {
                  fontSize: 18,
                },
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
  updatePlan: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  token: state.authReducer.token,
  planData: state.authReducer.planData,
});

export default connect(mapStateToProps, { updatePlan })(Plan);
