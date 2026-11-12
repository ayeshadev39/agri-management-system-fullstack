import { INVENTORY_REQUEST as T } from "../../actions/utilities";
const INIT = { items: [], loading: false };
export const inventoryReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_INVENTORY_SUCCESS: return { ...state, items: action.payload };
    case T.ADD_ITEM_SUCCESS: return { ...state, items: [...state.items, action.payload] };
    case T.UPDATE_ITEM_SUCCESS: return { ...state, items: state.items.map(i => i.id === action.payload.id ? action.payload : i) };
    case T.REMOVE_ITEM_SUCCESS: return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default: return state;
  }
};