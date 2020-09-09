import { VIEW_PLAN, UPDATE_PLAN, LOGOUT } from "../../other/types";

const originalState = {
  planData: [],
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
    default:
      return state;
  }
}

export default planReducer;
