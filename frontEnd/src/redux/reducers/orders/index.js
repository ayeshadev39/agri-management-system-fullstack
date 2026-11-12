import { ORDER_REQUEST as T } from "../../actions/utilities";
const INIT = { orders: [], loading: false };
export const ordersReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_ORDERS_SUCCESS: return { ...state, orders: action.payload };
    case T.ADD_ORDER_SUCCESS: return { ...state, orders: [...state.orders, action.payload] };
    case T.UPDATE_ORDER_SUCCESS: return { ...state, orders: state.orders.map(o => o.id === action.payload.id ? action.payload : o) };
    case T.REMOVE_ORDER_SUCCESS: return { ...state, orders: state.orders.filter(o => o.id !== action.payload) };
    default: return state;
  }
};