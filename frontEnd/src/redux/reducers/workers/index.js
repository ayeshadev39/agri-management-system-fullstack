import { WORKER_REQUEST as T } from "../../actions/utilities";
const INIT = { workers: [], loading: false };
export const workersReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_WORKERS_SUCCESS: return { ...state, workers: action.payload };
    case T.ADD_WORKER_SUCCESS: return { ...state, workers: [...state.workers, action.payload] };
    case T.UPDATE_WORKER_SUCCESS: return { ...state, workers: state.workers.map(w => w.id === action.payload.id ? action.payload : w) };
    case T.REMOVE_WORKER_SUCCESS: return { ...state, workers: state.workers.filter(w => w.id !== action.payload) };
    default: return state;
  }
};