import { getBuyers, createBuyer, updateBuyer, removeBuyer } from "../../api/buyers";
import { FAILURE, REQUEST, SUCCESS, BUYER_REQUEST } from "../utilities";

export const GETBUYERS = () => (dispatch) => {
  dispatch(REQUEST(BUYER_REQUEST.GET_BUYERS_REQUEST));
  getBuyers().then((res) => {
    dispatch(SUCCESS(BUYER_REQUEST.GET_BUYERS_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(BUYER_REQUEST.GET_BUYERS_FAILURE, err.message)));
};

export const ADDBUYER = (data, next) => (dispatch) => {
  dispatch(REQUEST(BUYER_REQUEST.ADD_BUYER_REQUEST));
  createBuyer(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(BUYER_REQUEST.ADD_BUYER_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const UPDATEBUYER = (data, next) => (dispatch) => {
  dispatch(REQUEST(BUYER_REQUEST.UPDATE_BUYER_REQUEST));
  updateBuyer(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(BUYER_REQUEST.UPDATE_BUYER_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVEBUYER = (id, next) => (dispatch) => {
  dispatch(REQUEST(BUYER_REQUEST.REMOVE_BUYER_REQUEST));
  removeBuyer(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(BUYER_REQUEST.REMOVE_BUYER_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};