import { ATTENDANCE_REQUEST as T } from "../../actions/utilities";
const INIT = { records: [], loading: false };
export const attendanceReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_ATTENDANCE_SUCCESS: return { ...state, records: action.payload };
    case T.MARK_ATTENDANCE_SUCCESS: return { ...state, records: [...state.records, action.payload] };
    default: return state;
  }
};