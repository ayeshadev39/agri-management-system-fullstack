import { getLogs, createLog } from "../../api/activity";
import { FAILURE, REQUEST, SUCCESS, ACTIVITY_REQUEST } from "../utilities";

export const GETLOGS = () => (dispatch) => {
  dispatch(REQUEST(ACTIVITY_REQUEST.GET_LOGS_REQUEST));
  getLogs().then(res => {
    dispatch(SUCCESS(ACTIVITY_REQUEST.GET_LOGS_SUCCESS, res.data.data));
  });
};

export const ADDLOG = (data) => (dispatch) => {
  createLog(data).then(res => { 
    if(res.data && res.data.succeeded) {
      dispatch(SUCCESS(ACTIVITY_REQUEST.ADD_LOG_SUCCESS, res.data.data)); 
    } 
  });
};