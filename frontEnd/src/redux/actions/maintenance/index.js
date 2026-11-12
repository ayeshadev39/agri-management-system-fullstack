import { getMaintenance, createMaintenance, removeMaintenance } from "../../api/maintenance";
import { FAILURE, REQUEST, SUCCESS, MAINTENANCE_REQUEST } from "../utilities";
export const GETMAINTENANCE = () => (dispatch) => {
  dispatch(REQUEST(MAINTENANCE_REQUEST.GET_MAINTENANCE_REQUEST));
  getMaintenance().then(res => dispatch(SUCCESS(MAINTENANCE_REQUEST.GET_MAINTENANCE_SUCCESS, res.data.data)));
};
export const ADDMAINTENANCE = (data, next) => (dispatch) => {
  dispatch(REQUEST(MAINTENANCE_REQUEST.ADD_MAINTENANCE_REQUEST));
  createMaintenance(data).then(res => { if(res.data.succeeded) { dispatch(SUCCESS(MAINTENANCE_REQUEST.ADD_MAINTENANCE_SUCCESS, res.data.data)); if(next) next(); } });
};
export const REMOVEMAINTENANCE = (id, next) => (dispatch) => {
  dispatch(REQUEST(MAINTENANCE_REQUEST.REMOVE_MAINTENANCE_REQUEST));
  removeMaintenance(id).then(res => { if(res.data.succeeded) { dispatch(SUCCESS(MAINTENANCE_REQUEST.REMOVE_MAINTENANCE_SUCCESS, id)); if(next) next(); } });
};