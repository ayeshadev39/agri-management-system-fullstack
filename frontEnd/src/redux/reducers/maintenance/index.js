import { MAINTENANCE_REQUEST as T } from "../../actions/utilities";
const INIT = { services: [], loading: false };
export const maintenanceReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_MAINTENANCE_SUCCESS: return { ...state, services: action.payload };
    case T.ADD_MAINTENANCE_SUCCESS: return { ...state, services: [...state.services, action.payload] };
    case T.REMOVE_MAINTENANCE_SUCCESS: return { ...state, services: state.services.filter(m => m.id !== action.payload) };
    default: return state;
  }
};