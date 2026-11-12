import { getOrders, createOrder, updateOrder, removeOrder } from "../../api/orders";
import { FAILURE, REQUEST, SUCCESS, ORDER_REQUEST } from "../utilities";

export const GETORDERS = () => (dispatch) => {
  dispatch(REQUEST(ORDER_REQUEST.GET_ORDERS_REQUEST));
  getOrders().then((res) => {
    dispatch(SUCCESS(ORDER_REQUEST.GET_ORDERS_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(ORDER_REQUEST.GET_ORDERS_FAILURE, err.message)));
};

export const ADDORDER = (data, next) => (dispatch) => {
  dispatch(REQUEST(ORDER_REQUEST.ADD_ORDER_REQUEST));
  createOrder(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(ORDER_REQUEST.ADD_ORDER_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const UPDATEORDER = (data, next) => (dispatch) => {
  dispatch(REQUEST(ORDER_REQUEST.UPDATE_ORDER_REQUEST));
  updateOrder(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(ORDER_REQUEST.UPDATE_ORDER_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVEORDER = (id, next) => (dispatch) => {
  dispatch(REQUEST(ORDER_REQUEST.REMOVE_ORDER_REQUEST));
  removeOrder(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(ORDER_REQUEST.REMOVE_ORDER_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};