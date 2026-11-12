import { getWorkers, createWorker, updateWorker, removeWorker } from "../../api/workers";
import { FAILURE, REQUEST, SUCCESS, WORKER_REQUEST } from "../utilities";

export const GETWORKERS = () => (dispatch) => {
  dispatch(REQUEST(WORKER_REQUEST.GET_WORKERS_REQUEST));
  getWorkers().then((res) => {
    dispatch(SUCCESS(WORKER_REQUEST.GET_WORKERS_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(WORKER_REQUEST.GET_WORKERS_FAILURE, err.message)));
};

export const ADDWORKER = (data, next) => (dispatch) => {
  dispatch(REQUEST(WORKER_REQUEST.ADD_WORKER_REQUEST));
  createWorker(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(WORKER_REQUEST.ADD_WORKER_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const UPDATEWORKER = (data, next) => (dispatch) => {
  dispatch(REQUEST(WORKER_REQUEST.UPDATE_WORKER_REQUEST));
  updateWorker(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(WORKER_REQUEST.UPDATE_WORKER_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVEWORKER = (id, next) => (dispatch) => {
  dispatch(REQUEST(WORKER_REQUEST.REMOVE_WORKER_REQUEST));
  removeWorker(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(WORKER_REQUEST.REMOVE_WORKER_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};