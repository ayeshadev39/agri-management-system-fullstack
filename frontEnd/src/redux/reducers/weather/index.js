import { WEATHER_REQUEST as T } from "../../actions/utilities";
const INIT = { data: null, loading: false, error: null };
export const weatherReducer = (state = INIT, action) => {
  switch(action.type) {
    case T.FETCH_REQUEST: return { ...state, loading: true };
    case T.FETCH_SUCCESS: return { ...state, loading: false, data: action.payload };
    case T.FETCH_FAILURE: return { ...state, loading: false, error: action.payload };
    default: return state;
  }
};