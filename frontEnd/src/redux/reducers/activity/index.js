import { ACTIVITY_REQUEST as T } from "../../actions/utilities";

const INIT = { logs: [], loading: false };

export const activityReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_LOGS_SUCCESS: 
      return { ...state, logs: action.payload || [] };
    case T.ADD_LOG_SUCCESS: 
      return { ...state, logs: [action.payload, ...state.logs] };
    default: 
      return state;
  }
};