import { CROP_REQUEST as T } from "../../actions/utilities";

const INITIAL_STATE = {
  crops: [], // ✅ Ab khali hai, data backend se aayega
  cropsLoading: false,
  cropsSuccess: false,
  cropsFailure: false,
  cropsError: null,
  addLoading: false,
  addSuccess: false,
  addFailure: false,
  addError: null,
  updateLoading: false,
  updateSuccess: false,
  updateFailure: false,
  updateError: null,
  removeLoading: false,
  removeSuccess: false,
  removeFailure: false,
  removeError: null,
};

export const cropsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET
    case T.GET_CROPS_REQUEST:
      return { ...state, cropsLoading: true, cropsSuccess: false, cropsFailure: false, cropsError: null };
    case T.GET_CROPS_SUCCESS:
      return { ...state, cropsLoading: false, cropsSuccess: true, crops: action.payload };
    case T.GET_CROPS_FAILURE:
      return { ...state, cropsLoading: false, cropsFailure: true, cropsError: action.payload };

    // ADD
    case T.ADD_CROP_REQUEST:
      return { ...state, addLoading: true, addSuccess: false, addFailure: false, addError: null };
    case T.ADD_CROP_SUCCESS:
      return { ...state, addLoading: false, addSuccess: true, crops: [...state.crops, action.payload] };
    case T.ADD_CROP_FAILURE:
      return { ...state, addLoading: false, addFailure: true, addError: action.payload };

    // UPDATE
    case T.UPDATE_CROP_REQUEST:
      return { ...state, updateLoading: true, updateSuccess: false, updateFailure: false, updateError: null };
    case T.UPDATE_CROP_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        crops: state.crops.map((c) => (c.id === action.payload.id ? action.payload : c)),
      };
    case T.UPDATE_CROP_FAILURE:
      return { ...state, updateLoading: false, updateFailure: true, updateError: action.payload };

    // REMOVE
    case T.REMOVE_CROP_REQUEST:
      return { ...state, removeLoading: true, removeSuccess: false, removeFailure: false, removeError: null };
    case T.REMOVE_CROP_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        crops: state.crops.filter((c) => c.id !== action.payload),
      };
    case T.REMOVE_CROP_FAILURE:
      return { ...state, removeLoading: false, removeFailure: true, removeError: action.payload };

    default:
      return state;
  }
};