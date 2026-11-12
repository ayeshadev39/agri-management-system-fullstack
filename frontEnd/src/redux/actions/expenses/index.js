import { getExpenses, createExpense, removeExpense } from "../../api/expenses";
import { FAILURE, REQUEST, SUCCESS, EXPENSE_REQUEST } from "../utilities";

export const GETEXPENSES = () => (dispatch) => {
  dispatch(REQUEST(EXPENSE_REQUEST.GET_EXPENSES_REQUEST));
  getExpenses().then((res) => {
    dispatch(SUCCESS(EXPENSE_REQUEST.GET_EXPENSES_SUCCESS, res.data.data));
  }).catch(err => dispatch(FAILURE(EXPENSE_REQUEST.GET_EXPENSES_FAILURE, err.message)));
};

export const ADDEXPENSE = (data, next) => (dispatch) => {
  dispatch(REQUEST(EXPENSE_REQUEST.ADD_EXPENSE_REQUEST));
  createExpense(data).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(EXPENSE_REQUEST.ADD_EXPENSE_SUCCESS, res.data.data)); 
      if(next) next(); 
    } 
  });
};

export const REMOVEEXPENSE = (id, next) => (dispatch) => {
  dispatch(REQUEST(EXPENSE_REQUEST.REMOVE_EXPENSE_REQUEST));
  removeExpense(id).then((res) => { 
    if(res.data.succeeded) { 
      dispatch(SUCCESS(EXPENSE_REQUEST.REMOVE_EXPENSE_SUCCESS, id)); 
      if(next) next(); 
    } 
  });
};