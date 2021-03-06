import axios from "axios";
import {
  VIEW_PLAN,
  UPDATE_PLAN,
  TOTAL_UNITS,
  RESET_UNITS,
  NEW_ALERT,
  REMOVE_ALERT,
} from "../../other/types";

export const plan = () => async (dispatch) => {
  var token = localStorage.getItem("token");
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };
  try {
    var planIDs = [];
    await axios
      .get("/api/coursePlan/allPlansByID", config)
      .then((result) => (planIDs = result.data))
      .catch((err) => console.error(err));

    var allData = [];
    for (var i = 0; i < planIDs.length; i++) {
      var planID = planIDs[i]._id;
      var url = "/api/coursePlan/getPlan/" + planID;

      await axios
        .get(url, config)
        .then((result) => {
          var planInfo = result.data[0];
          planInfo.firstYear.quarters.forEach((quarter) => {
            quarter.courses.forEach((courseInfo) => {
              delete courseInfo._id;
            });
          });
          planInfo.secondYear.quarters.forEach((quarter) => {
            quarter.courses.forEach((courseInfo) => {
              delete courseInfo._id;
            });
          });
          planInfo.thirdYear.quarters.forEach((quarter) => {
            quarter.courses.forEach((courseInfo) => {
              delete courseInfo._id;
            });
          });
          planInfo.fourthYear.quarters.forEach((quarter) => {
            quarter.courses.forEach((courseInfo) => {
              delete courseInfo._id;
            });
          });
          planInfo.fifthYear.quarters.forEach((quarter) => {
            quarter.courses.forEach((courseInfo) => {
              delete courseInfo._id;
            });
          });

          allData.push(planInfo);
        })
        .catch((err) => console.error(err));
    }
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: VIEW_PLAN,
    payload: allData,
  });
};

export const updatePlan = (newPlan, planData, index) => (dispatch) => {
  var planInfo = newPlan;
  planInfo.firstYear.quarters.forEach((quarter) => {
    quarter.courses.forEach((courseInfo) => {
      delete courseInfo._id;
    });
  });
  planInfo.secondYear.quarters.forEach((quarter) => {
    quarter.courses.forEach((courseInfo) => {
      delete courseInfo._id;
    });
  });
  planInfo.thirdYear.quarters.forEach((quarter) => {
    quarter.courses.forEach((courseInfo) => {
      delete courseInfo._id;
    });
  });
  planInfo.fourthYear.quarters.forEach((quarter) => {
    quarter.courses.forEach((courseInfo) => {
      delete courseInfo._id;
    });
  });
  planInfo.fifthYear.quarters.forEach((quarter) => {
    quarter.courses.forEach((courseInfo) => {
      delete courseInfo._id;
    });
  });

  planData[index] = planInfo;

  dispatch({
    type: UPDATE_PLAN,
    payload: planData,
  });
};

export const planTotalUnits = (oldValue, newValue) => (dispatch) => {
  if (oldValue === null && newValue === null) {
    dispatch({
      type: RESET_UNITS,
    });
  } else {
    const payload = {
      oldValue,
      newValue,
    };

    dispatch({
      type: TOTAL_UNITS,
      payload,
    });
  }
};

export const newPlanAlert = (severity, message, year, quarterNum) => (
  dispatch
) => {
  const payload = {
    message,
    severity,
    quarterNum,
    year,
  };
  dispatch({
    type: NEW_ALERT,
    payload,
  });
};

export const deleteAlert = (quarterNum, year) => (dispatch) => {
  const payload = {
    quarterNum,
    year,
  };
  dispatch({
    type: REMOVE_ALERT,
    payload,
  });
};
