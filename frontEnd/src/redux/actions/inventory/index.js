import { getInventory, createItem, updateItem, removeItem } from "../../api/inventory";
import { FAILURE, REQUEST, SUCCESS, INVENTORY_REQUEST } from "../utilities";

export const GETINVENTORY = () => (dispatch) => {
  dispatch(REQUEST(INVENTORY_REQUEST.GET_INVENTORY_REQUEST));
  getInventory().then((res) => {
    dispatch(SUCCESS(INVENTORY_REQUEST.GET_INVENTORY_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(INVENTORY_REQUEST.GET_INVENTORY_FAILURE, err.message)));
};

export const ADDITEM = (data, next) => (dispatch) => {
  dispatch(REQUEST(INVENTORY_REQUEST.ADD_ITEM_REQUEST));
  createItem(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(INVENTORY_REQUEST.ADD_ITEM_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const UPDATEITEM = (data, next) => (dispatch) => {
  dispatch(REQUEST(INVENTORY_REQUEST.UPDATE_ITEM_REQUEST));
  updateItem(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(INVENTORY_REQUEST.UPDATE_ITEM_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVEITEM = (id, next) => (dispatch) => {
  dispatch(REQUEST(INVENTORY_REQUEST.REMOVE_ITEM_REQUEST));
  removeItem(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(INVENTORY_REQUEST.REMOVE_ITEM_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};