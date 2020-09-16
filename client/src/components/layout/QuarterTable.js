import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import axios from "axios";
import { updatePlan, planTotalUnits } from "../../Redux/actions/plan";
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
    if (year === "firstYear") {
      title = planData[planIndex].firstYear.quarters[quarterNum].season;
    } else if (year === "secondYear") {
      title = planData[planIndex].secondYear.quarters[quarterNum].season;
    } else if (year === "thirdYear") {
      title = planData[planIndex].thirdYear.quarters[quarterNum].season;
    } else if (year === "fourthYear") {
      title = planData[planIndex].fourthYear.quarters[quarterNum].season;
    } else if (year === "fifthYear") {
      title = planData[planIndex].fifthYear.quarters[quarterNum].season;
    }
    const totalUnits = calculateUnits(planIndex, "init");
    planTotalUnits(0, totalUnits);
    setData({
      ...data,
      planIndex,
      title,
      totalUnits,
    });
  };

  const calculateUnits = (planIndex, type) => {
    var currentPlanData = checkYear(year, planIndex);
    var totalUnits = 0;
    currentPlanData.quarters[quarterNum].courses.forEach((courseObject) => {
      totalUnits = totalUnits + parseInt(courseObject.units);
    });

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

  const updateTableCellEdit = async (
    newValue,
    rowData,
    columnDef,
    year,
    quarterNum
  ) => {
    const courseNum = rowData.tableData.id;

    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    var currentPlanData = checkYear(year, data.planIndex);

    if (columnDef.field === "course") {
      if (newValue === "") {
        currentPlanData.quarters[quarterNum].courses[courseNum].course = "-";
      } else {
        currentPlanData.quarters[quarterNum].courses[
          courseNum
        ].course = newValue;
      }
    }

    if (columnDef.field === "units") {
      if (newValue === "" || Number.isNaN(parseInt(newValue))) {
        currentPlanData.quarters[quarterNum].courses[courseNum].units = "4";
      } else {
        currentPlanData.quarters[quarterNum].courses[
          courseNum
        ].units = newValue;
      }
    }

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

    if (newData.course === undefined) {
      newData.course = "-";
    }
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
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) =>
            new Promise((resolve, reject) => {
              updateTableCellEdit(
                newValue,
                rowData,
                columnDef,
                year,
                quarterNum
              );
              tableRef.current && tableRef.current.onQueryChange();
              calculateUnits(planIndex);
              resolve();
            }),
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Add Course",
            isFreeAction: true,
            onClick: () => {
              addCourse({}, year, quarterNum);
              tableRef.current && tableRef.current.onQueryChange();
              calculateUnits(planIndex);
            },
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              deleteCourse(oldData, year, quarterNum);
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
};

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps, { updatePlan, planTotalUnits })(
  QuarterTable
);
