import React, { Fragment, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import myTheme from "../layout/myTheme.component";
import QuarterTable from "../layout/QuarterTable";
import Notes from "../layout/Notes";
import ModifiedDate from "../layout/ModifiedDate";
import Alert from "@material-ui/lab/Alert";

const Plan = ({ userAuth, planData }) => {
  let { planID } = useParams();

  const [data, setData] = useState({
    planIndex: null,
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
    });
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
            </div>
            <div className="planLeft">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"firstYear"}
                quarterNum={0}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"firstYear"}
                quarterNum={1}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"firstYear"}
                quarterNum={2}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"firstYear"}
                quarterNum={3}
              />
            </div>
            <div className="planLeft">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"secondYear"}
                quarterNum={0}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"secondYear"}
                quarterNum={1}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"secondYear"}
                quarterNum={2}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"secondYear"}
                quarterNum={3}
              />
            </div>

            <div className="planLeft">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"thirdYear"}
                quarterNum={0}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"thirdYear"}
                quarterNum={1}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"thirdYear"}
                quarterNum={2}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"thirdYear"}
                quarterNum={3}
              />
            </div>

            <div className="planLeft">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"fourthYear"}
                quarterNum={0}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"fourthYear"}
                quarterNum={1}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"fourthYear"}
                quarterNum={2}
              />
            </div>
            <div className="plan">
              <QuarterTable
                planID={planID}
                planIndex={data.planIndex}
                year={"fourthYear"}
                quarterNum={3}
              />
            </div>

            <Notes planID={planID} planIndex={data.planIndex} />
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
};
const mapStateToProps = (state) => ({
  userAuth: state.authReducer.userAuth,
  planData: state.planReducer.planData,
});

export default connect(mapStateToProps)(Plan);
