import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import axios from "axios";
import { updatePlan } from "../../Redux/actions/plan";
import moment from "moment";

const QuarterTable = ({
  token,
  planData,
  updatePlan,
  planID,
  planIndex,
  year,
  quarterNum,
}) => {
  const [data, setData] = useState({
    columns: [
      { title: "Courses", field: "course" },
      { title: "Units", field: "units" },
    ],
    planIndex: null,
    tableInfo: [],
    title: "",
  });

  useEffect(() => {
    initialState();
  }, [planIndex, planData]);

  const initialState = () => {
    var tableInfo;
    var title;
    if (year === "firstYear") {
      tableInfo = planData[planIndex].firstYear.quarters[quarterNum].courses;
      title = planData[planIndex].firstYear.quarters[quarterNum].season;
    } else if (year === "secondYear") {
      tableInfo = planData[planIndex].secondYear.quarters[quarterNum].courses;
      title = planData[planIndex].secondYear.quarters[quarterNum].season;
    } else if (year === "thirdYear") {
      tableInfo = planData[planIndex].thirdYear.quarters[quarterNum].courses;
      title = planData[planIndex].thirdYear.quarters[quarterNum].season;
    } else if (year === "fourthYear") {
      tableInfo = planData[planIndex].fourthYear.quarters[quarterNum].courses;
      title = planData[planIndex].fourthYear.quarters[quarterNum].season;
    } else if (year === "fifthYear") {
      tableInfo = planData[planIndex].fifthYear.quarters[quarterNum].courses;
      title = planData[planIndex].fifthYear.quarters[quarterNum].season;
    }
    setData({
      ...data,
      planIndex,
      tableInfo,
      title,
    });
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
    var currentPlanData;

    if (year === "firstYear") {
      currentPlanData = planData[data.planIndex].firstYear;
    }
    if (year === "secondYear") {
      currentPlanData = planData[data.planIndex].secondYear;
    }
    if (year === "thirdYear") {
      currentPlanData = planData[data.planIndex].thirdYear;
    }
    if (year === "fourthYear") {
      currentPlanData = planData[data.planIndex].fourthYear;
    }
    if (year === "fifthYear") {
      currentPlanData = planData[data.planIndex].fifthYear;
    }

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
      if (newValue === "") {
        currentPlanData.quarters[quarterNum].courses[courseNum].units = "-";
      } else {
        currentPlanData.quarters[quarterNum].courses[
          courseNum
        ].units = newValue;
      }
    }

    var currentTime = moment().toISOString();
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

    var url = "/api/coursePlan/updatePlan/" + planID;
    await axios
      .post(url, body, config)
      .catch((err) => console.error(err))
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      });
    setData({
      ...data,
      tableInfo: currentPlanData.quarters[quarterNum].courses,
    });
  };

  return (
    <MaterialTable
      title={data.title}
      columns={data.columns}
      data={data.tableInfo}
      cellEditable={{
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateTableCellEdit(
                newValue,
                rowData,
                columnDef,
                year,
                quarterNum
              );
              resolve();
            }, 500);
          }),
      }}
      options={{
        search: false,
        tableLayout: "auto",
        draggable: false,
        headerStyle: {
          fontSize: 20,
        },
        rowStyle: {
          fontSize: 18,
        },
        paging: false,
        padding: "dense",
        paginationType: "normal",
      }}
    />
  );
};

QuarterTable.propTypes = {
  token: PropTypes.string,
  updatePlan: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps, { updatePlan })(QuarterTable);
