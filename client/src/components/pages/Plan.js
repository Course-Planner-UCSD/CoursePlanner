import React, { Fragment, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "../layout/myTheme.component";
import QuarterTable from "../layout/QuarterTable";
import Notes from "../layout/Notes";
import ModifiedDate from "../layout/ModifiedDate";
import Card from "@material-ui/core/Card";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { updatePlan, planTotalUnits } from "../../Redux/actions/plan";
import Axios from "axios";

const Plan = ({
  userAuth,
  planData,
  currentTotalUnits,
  planTotalUnits,
  updatePlan,
  token,
}) => {
  let { planID } = useParams();

  const [data, setData] = useState({
    planIndex: null,
    totalUnits: 0,
    summerChecked: false,
    fiveYearChecked: false,
  });

  useLayoutEffect(() => {
    var mount = false;
    if (!mount && userAuth) {
      initialState();
    }

    return () => {
      mount = true;
    };
  }, []);

  const initialState = () => {
    //DO NOT try to get anything from planData here since the app will crash

    var finalIndex = 0;
    planData.forEach((currentPlan, index) => {
      if (currentPlan._id === planID) {
        finalIndex = index;
      }
    });

    const showSummer = planData[finalIndex].showSummer;
    const showfifth = planData[finalIndex].showFifthYear;
    setData({
      ...data,
      planIndex: finalIndex,
      summerChecked: showSummer,
      fiveYearChecked: showfifth,
    });
  };

  const displaySummer = (event) => {
    var summerTotal = 0;

    if (!event.target.checked) {
      planData[data.planIndex].firstYear.quarters[3].courses.forEach(
        (course) => {
          summerTotal = summerTotal + parseInt(course.units);
        }
      );
      planData[data.planIndex].secondYear.quarters[3].courses.forEach(
        (course) => {
          summerTotal = summerTotal + parseInt(course.units);
        }
      );
      planData[data.planIndex].thirdYear.quarters[3].courses.forEach(
        (course) => {
          summerTotal = summerTotal + parseInt(course.units);
        }
      );
      planData[data.planIndex].fourthYear.quarters[3].courses.forEach(
        (course) => {
          summerTotal = summerTotal + parseInt(course.units);
        }
      );
      planData[data.planIndex].fifthYear.quarters[3].courses.forEach(
        (course) => {
          summerTotal = summerTotal + parseInt(course.units);
        }
      );
      planTotalUnits(summerTotal, 0);
    }
    saveSummerChecked(event.target.checked);

    setData({ ...data, summerChecked: event.target.checked });
  };

  const saveSummerChecked = async (summerData) => {
    const body = JSON.stringify({ showSummer: summerData });
    const url = "/api/coursePlan/updatePlan/" + planID;
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    await Axios.post(url, body, config)
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      })
      .catch((err) => console.error(err));
  };

  const displayFiveYears = (event) => {
    var fifthYearTotal = 0;
    if (!event.target.checked) {
      planData[data.planIndex].fifthYear.quarters.forEach((quarter) => {
        quarter.courses.forEach((course) => {
          fifthYearTotal = fifthYearTotal + parseInt(course.units);
        });
      });

      planTotalUnits(fifthYearTotal, 0);
    }
    saveFifthYear(event.target.checked);
    setData({ ...data, fiveYearChecked: event.target.checked });
  };

  const saveFifthYear = async (fifthData) => {
    const body = JSON.stringify({ showFifthYear: fifthData });
    const url = "/api/coursePlan/updatePlan/" + planID;
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    await Axios.post(url, body, config)
      .then((result) => {
        updatePlan(result.data, planData, data.planIndex);
      })
      .catch((err) => console.error(err));
  };

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <div id="myBackground">
        {data.planIndex != null ? (
          <Fragment>
            <div className="planHeader">
              <h1>{planData[data.planIndex].name}</h1>
              <ModifiedDate planIndex={data.planIndex} />
              <h3>Total Units: {currentTotalUnits}</h3>
              <FormControlLabel
                control={
                  <Switch
                    checked={data.summerChecked}
                    onChange={displaySummer}
                    name="Summer"
                    color="secondary"
                  />
                }
                label="Summer Courses"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={data.fiveYearChecked}
                    onChange={displayFiveYears}
                    name="Fifth Year"
                    color="secondary"
                  />
                }
                label="Fifth Year"
                labelPlacement="start"
              />
            </div>
            <Fragment>
              <Card className="yearCard">
                <h1 className="text yearHeaderText">2020-2021</h1>
                <div className="year">
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"firstYear"}
                      quarterNum={0}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"firstYear"}
                      quarterNum={1}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"firstYear"}
                      quarterNum={2}
                    />
                  </div>
                  {data.summerChecked && (
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"firstYear"}
                        quarterNum={3}
                      />
                    </div>
                  )}
                </div>
              </Card>
              <Card className="yearCard">
                <h1 className="text yearHeaderText">2021-2022</h1>
                <div className="year">
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"secondYear"}
                      quarterNum={0}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"secondYear"}
                      quarterNum={1}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"secondYear"}
                      quarterNum={2}
                    />
                  </div>
                  {data.summerChecked && (
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"secondYear"}
                        quarterNum={3}
                      />
                    </div>
                  )}
                </div>
              </Card>
              <Card className="yearCard">
                <h1 className="text yearHeaderText">2022-2023</h1>
                <div className="year">
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"thirdYear"}
                      quarterNum={0}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"thirdYear"}
                      quarterNum={1}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"thirdYear"}
                      quarterNum={2}
                    />
                  </div>
                  {data.summerChecked && (
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"thirdYear"}
                        quarterNum={3}
                      />
                    </div>
                  )}
                </div>
              </Card>
              <Card className="yearCard">
                <h1 className="text yearHeaderText">2023-2024</h1>
                <div className="year">
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"fourthYear"}
                      quarterNum={0}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"fourthYear"}
                      quarterNum={1}
                    />
                  </div>
                  <div
                    className={`plan ${
                      data.summerChecked ? "summer" : "noSummer"
                    }`}
                  >
                    <QuarterTable
                      planID={planID}
                      planIndex={data.planIndex}
                      year={"fourthYear"}
                      quarterNum={2}
                    />
                  </div>
                  {data.summerChecked && (
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"fourthYear"}
                        quarterNum={3}
                      />
                    </div>
                  )}
                </div>
              </Card>
              {data.fiveYearChecked && (
                <Card className="yearCard">
                  <h1 className="text yearHeaderText">2024-2025</h1>
                  <div className="year">
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"fifthYear"}
                        quarterNum={0}
                      />
                    </div>
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"fifthYear"}
                        quarterNum={1}
                      />
                    </div>
                    <div
                      className={`plan ${
                        data.summerChecked ? "summer" : "noSummer"
                      }`}
                    >
                      <QuarterTable
                        planID={planID}
                        planIndex={data.planIndex}
                        year={"fifthYear"}
                        quarterNum={2}
                      />
                    </div>
                    {data.summerChecked && (
                      <div
                        className={`plan ${
                          data.summerChecked ? "summer" : "noSummer"
                        }`}
                      >
                        <QuarterTable
                          planID={planID}
                          planIndex={data.planIndex}
                          year={"fifthYear"}
                          quarterNum={3}
                        />
                      </div>
                    )}
                  </div>
                </Card>
              )}
              <Notes planID={planID} planIndex={data.planIndex} />
            </Fragment>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </ThemeProvider>
  );
};

Plan.propTypes = {
  token: PropTypes.string,
  userAuth: PropTypes.bool,
  currentTotalUnits: PropTypes.number,
  planTotalUnits: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  planData: state.planReducer.planData,
  currentTotalUnits: state.planReducer.currentTotalUnits,
  token: state.authReducer.token,
});

export default connect(mapStateToProps, { planTotalUnits, updatePlan })(Plan);
