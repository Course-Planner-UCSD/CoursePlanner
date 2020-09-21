import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import axios from "axios";
import {
  updatePlan,
  planTotalUnits,
  newPlanAlert,
} from "../../Redux/actions/plan";
import moment from "moment";

const QuarterTable = ({
  token,
  planData,
  updatePlan,
  planID,
  planIndex,
  year,
  quarterNum,
  planTotalUnits,
  newPlanAlert,
}) => {
  const [data, setData] = useState({
    columns: [
      { title: "Courses", field: "course" },
      { title: "Units", field: "units", type: "numeric", align: "left" },
    ],
    planIndex: null,
    title: "",
    totalUnits: 0,
  });

  useEffect(() => {
    initialState();
  }, [planIndex, planData]);

  const initialState = () => {
    var title;
    var formattedYear;
    if (year === "firstYear") {
      title = planData[planIndex].firstYear.quarters[quarterNum].season;
      formattedYear = "first year";
    } else if (year === "secondYear") {
      title = planData[planIndex].secondYear.quarters[quarterNum].season;
      formattedYear = "second year";
    } else if (year === "thirdYear") {
      title = planData[planIndex].thirdYear.quarters[quarterNum].season;
      formattedYear = "third year";
    } else if (year === "fourthYear") {
      title = planData[planIndex].fourthYear.quarters[quarterNum].season;
      formattedYear = "fourth year";
    } else if (year === "fifthYear") {
      title = planData[planIndex].fifthYear.quarters[quarterNum].season;
      formattedYear = "fifth year";
    }
    const totalUnits = calculateUnits(
      planIndex,
      "init",
      formattedYear,
      title,
      quarterNum
    );
    planTotalUnits(0, totalUnits);
    setData({
      ...data,
      planIndex,
      title,
      totalUnits,
    });
  };

  const calculateUnits = (
    planIndex,
    type,
    formattedYear,
    title,
    quarterNum
  ) => {
    var currentPlanData = checkYear(year, planIndex);
    var totalUnits = 0;
    currentPlanData.quarters[quarterNum].courses.forEach((courseObject) => {
      totalUnits = totalUnits + parseInt(courseObject.units);
    });

    //insert map function to delete alerts for this particular quarter

    if (totalUnits > 20) {
      newPlanAlert(
        "error",
        "You have more than 20 units in the " +
          title +
          " quarter in the " +
          formattedYear,
        year,
        quarterNum
      );
    } else if (totalUnits > 18) {
      newPlanAlert(
        "warning",
        "You have more than 18 units in the " +
          title +
          " quarter in the " +
          formattedYear,
        year,
        quarterNum
      );
    } else if (totalUnits < 12 && quarterNum !== 3) {
      newPlanAlert(
        "warning",
        "You have less than 12 units in the " +
          title +
          " quarter in the " +
          formattedYear +
          ". A full time student has at least 12 units in a quarter.",
        year,
        quarterNum
      );
    }

    if (quarterNum == 3 && totalUnits > 8) {
      newPlanAlert(
        "warning",
        "Taking more than 8 units in the " +
          formattedYear +
          " summer session is not advised.",
        year,
        quarterNum
      );
    }

    if (type === "init") {
      return totalUnits;
    } else {
      planTotalUnits(data.totalUnits, totalUnits);
      setData({ ...data, totalUnits });
    }
  };

  const checkYear = (year, index) => {
    var currentPlanData;
    if (year === "firstYear") {
      currentPlanData = planData[index].firstYear;
    }
    if (year === "secondYear") {
      currentPlanData = planData[index].secondYear;
    }
    if (year === "thirdYear") {
      currentPlanData = planData[index].thirdYear;
    }
    if (year === "fourthYear") {
      currentPlanData = planData[index].fourthYear;
    }
    if (year === "fifthYear") {
      currentPlanData = planData[index].fifthYear;
    }
    return currentPlanData;
  };

  const generateBody = (year, currentPlanData, currentTime) => {
    var body;
    if (year === "firstYear") {
      body = JSON.stringify({
        firstYear: currentPlanData,
        modifiedDate: currentTime,
      });
    }
    if (year === "secondYear") {
      body = JSON.stringify({
        secondYear: currentPlanData,
        modifiedDate: currentTime,
      });
    }
    if (year === "thirdYear") {
      body = JSON.stringify({
        thirdYear: currentPlanData,
        modifiedDate: currentTime,
      });
    }
    if (year === "fourthYear") {
      body = JSON.stringify({
        fourthYear: currentPlanData,
        modifiedDate: currentTime,
      });
    }
    if (year === "fifthYear") {
      body = JSON.stringify({
        fifthYear: currentPlanData,
        modifiedDate: currentTime,
      });
    }
    return body;
  };

  const bulkEdit = async (changes, year, quarterNum) => {
    var currentPlanData = checkYear(year, data.planIndex);

    for (var i = 0; i < 15; i++) {
      if (changes[i] !== undefined) {
        currentPlanData.quarters[quarterNum].courses[i].course =
          changes[i].newData.course;
        currentPlanData.quarters[quarterNum].courses[i].units =
          changes[i].newData.units;
      }
    }
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    const currentTime = moment().toISOString();
    const body = generateBody(year, currentPlanData, currentTime);
    const url = "/api/coursePlan/updatePlan/" + planID;

    await axios
      .post(url, body, config)
      .catch((err) => console.error(err))
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      });
  };

  const deleteCourse = async (oldData, year, quarterNum) => {
    const courseNum = oldData.tableData.id;

    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    var currentPlanData = checkYear(year, data.planIndex);

    currentPlanData.quarters[quarterNum].courses = currentPlanData.quarters[
      quarterNum
    ].courses.filter((value, index, array) => {
      if (index !== courseNum) {
        return value;
      }
    });

    const currentTime = moment().toISOString();
    const body = generateBody(year, currentPlanData, currentTime);
    const url = "/api/coursePlan/updatePlan/" + planID;

    await axios
      .post(url, body, config)
      .catch((err) => console.error(err))
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      });
  };

  const addCourse = async (newData, year, quarterNum) => {
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    var currentPlanData = checkYear(year, data.planIndex);
    if (newData.units === undefined) {
      newData.units = "4";
    }
    const nextIndex = currentPlanData.quarters[quarterNum].courses.length;
    newData.tableData = { id: nextIndex };
    currentPlanData.quarters[quarterNum].courses.push(newData);

    const currentTime = moment().toISOString();
    const body = generateBody(year, currentPlanData, currentTime);
    const url = "/api/coursePlan/updatePlan/" + planID;

    await axios
      .post(url, body, config)
      .catch((err) => console.error(err))
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      });
  };
  const tableRef = React.createRef();
  return (
    <Fragment>
      <MaterialTable
        title={data.title}
        columns={data.columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            var tableInfo;
            if (year === "firstYear") {
              tableInfo =
                planData[planIndex].firstYear.quarters[quarterNum].courses;
            } else if (year === "secondYear") {
              tableInfo =
                planData[planIndex].secondYear.quarters[quarterNum].courses;
            } else if (year === "thirdYear") {
              tableInfo =
                planData[planIndex].thirdYear.quarters[quarterNum].courses;
            } else if (year === "fourthYear") {
              tableInfo =
                planData[planIndex].fourthYear.quarters[quarterNum].courses;
            } else if (year === "fifthYear") {
              tableInfo =
                planData[planIndex].fifthYear.quarters[quarterNum].courses;
            }
            resolve({
              data: tableInfo,
              page: query.page,
              totalCount: tableInfo.length,
            });
          })
        }
        tableRef={tableRef}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              deleteCourse(oldData, year, quarterNum);
              tableRef.current && tableRef.current.onQueryChange();
              calculateUnits(planIndex);
              resolve();
            }),
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              bulkEdit(changes, year, quarterNum);
              tableRef.current && tableRef.current.onQueryChange();
              calculateUnits(planIndex);
              resolve();
            }),
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              addCourse(newData, year, quarterNum);
              tableRef.current && tableRef.current.onQueryChange();
              calculateUnits(planIndex);
              resolve();
            }),
        }}
        options={{
          search: false,
          tableLayout: "auto",
          draggable: false,
          headerStyle: {
            fontSize: 18,
          },
          rowStyle: {
            fontSize: 18,
          },
          paging: false,
          padding: "dense",
          paginationType: "normal",
          actionsColumnIndex: -1,
          sorting: false,
        }}
        localization={{
          body: {
            editRow: {
              deleteText: "Are you sure you want to delete this course?",
            },
            emptyDataSourceMessage: "No courses to display",
          },
          header: {
            actions: "",
          },
        }}
      />
      <h3 className="unitsText">Units: {data.totalUnits}</h3>
    </Fragment>
  );
};

QuarterTable.propTypes = {
  token: PropTypes.string,
  updatePlan: PropTypes.func.isRequired,
  planTotalUnits: PropTypes.func.isRequired,
  newPlanAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps, {
  updatePlan,
  planTotalUnits,
  newPlanAlert,
})(QuarterTable);
