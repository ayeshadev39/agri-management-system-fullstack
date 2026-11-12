import { TASK_REQUEST as T } from "../../actions/utilities";
const INIT = { tasks: [], loading: false };
export const tasksReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.GET_TASKS_SUCCESS: return { ...state, tasks: action.payload };
    case T.ADD_TASK_SUCCESS: return { ...state, tasks: [...state.tasks, action.payload] };
    case T.UPDATE_TASK_SUCCESS: return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case T.REMOVE_TASK_SUCCESS: return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    default: return state;
  }
};