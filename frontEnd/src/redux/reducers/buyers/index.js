import { BUYER_REQUEST as T } from "../../actions/utilities";
const INIT = { buyers: [], loading: false };
export const buyersReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_BUYERS_SUCCESS: return { ...state, buyers: action.payload };
    case T.ADD_BUYER_SUCCESS: return { ...state, buyers: [...state.buyers, action.payload] };
    case T.UPDATE_BUYER_SUCCESS: return { ...state, buyers: state.buyers.map(b => b.id === action.payload.id ? action.payload : b) };
    case T.REMOVE_BUYER_SUCCESS: return { ...state, buyers: state.buyers.filter(b => b.id !== action.payload) };
    default: return state;
  }
};