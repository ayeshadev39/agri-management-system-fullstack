import { getEquipment, createEquipment, updateEquipment, removeEquipment } from "../../api/equipment";
import { FAILURE, REQUEST, SUCCESS, EQUIPMENT_REQUEST } from "../utilities";

export const GETEQUIPMENT = () => (dispatch) => {
  dispatch(REQUEST(EQUIPMENT_REQUEST.GET_EQUIPMENT_REQUEST));
  getEquipment().then((res) => {
    dispatch(SUCCESS(EQUIPMENT_REQUEST.GET_EQUIPMENT_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(EQUIPMENT_REQUEST.GET_EQUIPMENT_FAILURE, err.message)));
};

export const ADDEQUIPMENT = (data, next) => (dispatch) => {
  dispatch(REQUEST(EQUIPMENT_REQUEST.ADD_EQUIPMENT_REQUEST));
  createEquipment(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(EQUIPMENT_REQUEST.ADD_EQUIPMENT_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const UPDATEEQUIPMENT = (data, next) => (dispatch) => {
  dispatch(REQUEST(EQUIPMENT_REQUEST.UPDATE_EQUIPMENT_REQUEST));
  updateEquipment(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(EQUIPMENT_REQUEST.UPDATE_EQUIPMENT_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVEEQUIPMENT = (id, next) => (dispatch) => {
  dispatch(REQUEST(EQUIPMENT_REQUEST.REMOVE_EQUIPMENT_REQUEST));
  removeEquipment(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(EQUIPMENT_REQUEST.REMOVE_EQUIPMENT_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};