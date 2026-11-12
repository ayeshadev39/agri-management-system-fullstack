import { EXPENSE_REQUEST as T } from "../../actions/utilities";
const INIT = { expenses: [], loading: false };
export const expensesReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_EXPENSES_SUCCESS: return { ...state, expenses: action.payload };
    case T.ADD_EXPENSE_SUCCESS: return { ...state, expenses: [...state.expenses, action.payload] };
    case T.REMOVE_EXPENSE_SUCCESS: return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    default: return state;
  }
};