import {
  VIEW_PLAN,
  UPDATE_PLAN,
  LOGOUT,
  TOTAL_UNITS,
  RESET_UNITS,
  NEW_ALERT,
  REMOVE_ALERT,
} from "../../other/types";

const originalState = {
  planData: [],
  currentTotalUnits: 0,
  alert: [],
};

function planReducer(state = originalState, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        planData: [],
      };
    case VIEW_PLAN:
      return {
        ...state,
        planData: action.payload,
      };
    case UPDATE_PLAN:
      return {
        ...state,
        planData: action.payload,
      };
    case TOTAL_UNITS:
      var units =
        state.currentTotalUnits -
        action.payload.oldValue +
        action.payload.newValue;
      return {
        ...state,
        currentTotalUnits: units,
      };
    case RESET_UNITS:
      return {
        ...state,
        currentTotalUnits: 0,
      };
    case NEW_ALERT:
      var newAlertArray = state.alert;
      newAlertArray.push(action.payload);
      return {
        ...state,
        alert: newAlertArray,
      };
    case REMOVE_ALERT:
      var newAlert = [];
      state.alert.map((value) => {
        if (
          value.quarterNum !== action.payload.quarterNum ||
          value.year !== action.payload.year
        ) {
          /*console.log("current year" + value.year);
          console.log("delete year " + action.payload.year);
          console.log("current quarter " + value.quarterNum);
          console.log("delete quarter " + action.payload.quarterNum);*/
          newAlert.push(value);
        }
      });
      return {
        ...state,
        alert: newAlert,
      };
    default:
      return state;
  }
}

export default planReducer;
