import {
  VIEW_PLAN,
  UPDATE_PLAN,
  LOGOUT,
  TOTAL_UNITS,
  RESET_UNITS,
} from "../../other/types";

const originalState = {
  planData: [],
  currentTotalUnits: 0,
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
    default:
      return state;
  }
}

export default planReducer;
