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
      const alert = state.alert;
      alert.push(action.payload);
      return {
        ...state,
        alert,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: state.alert.filter((alert, index) => index !== action.payload),
      };
    default:
      return state;
  }
}

export default planReducer;
