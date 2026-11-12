import { EQUIPMENT_REQUEST as T } from "../../actions/utilities";
const INIT = { equipment: [], loading: false };
export const equipmentReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_EQUIPMENT_SUCCESS: return { ...state, equipment: action.payload };
    case T.ADD_EQUIPMENT_SUCCESS: return { ...state, equipment: [...state.equipment, action.payload] };
    case T.UPDATE_EQUIPMENT_SUCCESS: return { ...state, equipment: state.equipment.map(e => e.id === action.payload.id ? action.payload : e) };
    case T.REMOVE_EQUIPMENT_SUCCESS: return { ...state, equipment: state.equipment.filter(e => e.id !== action.payload) };
    default: return state;
  }
};