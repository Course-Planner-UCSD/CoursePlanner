import React, { Fragment, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";
import { updatePlan } from "../../Redux/actions/plan";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "../layout/myTheme.component";
import Card from "@material-ui/core/Card";

const Plan = ({ userAuth, token, planData, updatePlan }) => {
  let { planID } = useParams();

  const [data, setData] = useState({
    columns: [
      { title: "Courses", field: "course" },
      { title: "Units", field: "units" },
    ],
    lastModified: null,
    planIndex: null,
    text: "",
  });

  useLayoutEffect(() => {
    var mount = false;
    if (!mount && userAuth) {
      initialState();
    }

    return () => {
      mount = true;
    };
  }, [planData, userAuth]);

  const initialState = () => {
    //DO NOT try to get anything from planData here since the app will crash
    //Set everything in the state once in this setData function only
    var finalIndex = 0;
    planData.forEach((currentPlan, index) => {
      if (currentPlan._id === planID) {
        finalIndex = index;
      }
    });

    setData({
      ...data,
      planIndex: finalIndex,
      text: planData[finalIndex].notes,
      lastModified: moment(planData[finalIndex].modifiedDate).format(
        "MMMM Do, h:mm a"
      ),
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
      currentPlanData.quarters[quarterNum].courses[courseNum].course = newValue;
    }

    if (columnDef.field === "units") {
      currentPlanData.quarters[quarterNum].courses[courseNum].units = newValue;
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
    var newModified = moment(planData[data.planIndex].modifiedDate).format(
      "MMMM Do, h:mm a"
    );
    setData({ ...data, lastModified: newModified });
  };

  const textboxChange = (value) => {
    setData({ ...data, text: value });
  };

  const saveNotes = async () => {
    var url = "/api/coursePlan/updatePlan/" + planID;
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    var body = JSON.stringify({ notes: data.text });

    await axios
      .post(url, body, config)
      .catch((err) => console.error(err))
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      });
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <div id="myBackground">
        <Fragment>
          {data.planIndex != null ? (
            <Fragment>
              <div className="planHeader">
                <h1>{planData[data.planIndex].name}</h1>
                <h3>
                  Modified On:
                  {" " + data.lastModified}
                </h3>
              </div>
              <div className="planLeft">
                <MaterialTable
                  title="Fall"
                  columns={data.columns}
                  data={planData[data.planIndex].firstYear.quarters[0].courses}
                  cellEditable={{
                    onCellEditApproved: (
                      newValue,
                      oldValue,
                      rowData,
                      columnDef
                    ) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          updateTableCellEdit(
                            newValue,
                            rowData,
                            columnDef,
                            "firstYear",
                            0
                          );
                          resolve();
                        }, 3000);
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
              </div>
              <div className="plan">
                <MaterialTable
                  title="Winter"
                  columns={data.columns}
                  data={planData[data.planIndex].firstYear.quarters[1].courses}
                  cellEditable={{
                    onCellEditApproved: (
                      newValue,
                      oldValue,
                      rowData,
                      columnDef
                    ) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          updateTableCellEdit(
                            newValue,
                            rowData,
                            columnDef,
                            "firstYear",
                            1
                          );
                          resolve();
                        }, 3000);
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
              </div>
              <div className="plan">
                <MaterialTable
                  title="Spring"
                  columns={data.columns}
                  data={planData[data.planIndex].firstYear.quarters[2].courses}
                  cellEditable={{
                    onCellEditApproved: (
                      newValue,
                      oldValue,
                      rowData,
                      columnDef
                    ) =>
                      new Promise((resolve, reject) => {
                        updateTableCellEdit(
                          newValue,
                          rowData,
                          columnDef,
                          "firstYear",
                          2
                        );
                        setTimeout(resolve(), 3000);
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
              </div>
              <div className="plan">
                <MaterialTable
                  title="Summer"
                  columns={data.columns}
                  data={planData[data.planIndex].firstYear.quarters[3].courses}
                  cellEditable={{
                    onCellEditApproved: (
                      newValue,
                      oldValue,
                      rowData,
                      columnDef
                    ) =>
                      new Promise((resolve, reject) => {
                        updateTableCellEdit(
                          newValue,
                          rowData,
                          columnDef,
                          "firstYear",
                          3
                        );
                        setTimeout(resolve(), 3000);
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
              </div>
              <div>
                <Card id="notes">
                  <h2 className="text" id="notesText">
                    Notes
                  </h2>
                  <ReactQuill
                    value={data.text}
                    className="textbox"
                    onChange={textboxChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="save"
                    onClick={saveNotes}
                    id="saveNotesButton"
                  >
                    Save Notes
                  </Button>
                </Card>
              </div>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
        </Fragment>
      </div>
    </ThemeProvider>
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
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps, { updatePlan })(Plan);
