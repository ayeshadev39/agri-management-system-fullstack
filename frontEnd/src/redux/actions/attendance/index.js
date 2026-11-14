import { getAttendance, markAttendance } from "../../api/attendance";
import { FAILURE, REQUEST, SUCCESS, ATTENDANCE_REQUEST } from "../utilities";

export const GETATTENDANCE = () => (dispatch) => {
  dispatch(REQUEST(ATTENDANCE_REQUEST.GET_ATTENDANCE_REQUEST));
  getAttendance().then(res => dispatch(SUCCESS(ATTENDANCE_REQUEST.GET_ATTENDANCE_SUCCESS, res.data.data)))
    .catch(err => dispatch(FAILURE(ATTENDANCE_REQUEST.GET_ATTENDANCE_FAILURE, err.message)));
};

export const MARKATTENDANCE = (data, next) => (dispatch) => {
  dispatch(REQUEST(ATTENDANCE_REQUEST.MARK_ATTENDANCE_REQUEST));
  markAttendance(data).then(res => {
    if(res.data.succeeded) {
      dispatch(SUCCESS(ATTENDANCE_REQUEST.MARK_ATTENDANCE_SUCCESS, res.data.data));
      if(next) next();
    }
  });
};