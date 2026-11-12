import { getTasks, createTask, updateTask, removeTask } from "../../api/tasks";
import { FAILURE, REQUEST, SUCCESS, TASK_REQUEST } from "../utilities";

export const GETTASKS = () => (dispatch) => {
  dispatch(REQUEST(TASK_REQUEST.GET_TASKS_REQUEST));
  getTasks().then((res) => {
    dispatch(SUCCESS(TASK_REQUEST.GET_TASKS_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(TASK_REQUEST.GET_TASKS_FAILURE, err.message)));
};

export const ADDTASK = (data, next) => (dispatch) => {
  dispatch(REQUEST(TASK_REQUEST.ADD_TASK_REQUEST));
  createTask(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(TASK_REQUEST.ADD_TASK_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const UPDATETASK = (data, next) => (dispatch) => {
  dispatch(REQUEST(TASK_REQUEST.UPDATE_TASK_REQUEST));
  updateTask(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(TASK_REQUEST.UPDATE_TASK_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVETASK = (id, next) => (dispatch) => {
  dispatch(REQUEST(TASK_REQUEST.REMOVE_TASK_REQUEST));
  removeTask(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(TASK_REQUEST.REMOVE_TASK_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};