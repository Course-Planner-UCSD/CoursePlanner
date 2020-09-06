import axios from "axios";
import { VIEW_PLAN, UPDATE_PLAN } from "../other/types";

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
