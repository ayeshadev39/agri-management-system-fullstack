import { USER_REQUEST as T } from "../../actions/utilities";

const INITIAL_STATE = {
  user: null,
  role: null,
  isAuthenticated: false,
  loginLoading: false,
  loginFailure: false,
  loginError: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.LOGIN_REQUEST:
      return { ...state, loginLoading: true, loginFailure: false, loginError: null };
      
    case T.LOGIN_SUCCESS:
      // ✅ Agar role me Admin hai to wahi rakho, warna check karo
      let finalRole = action.payload?.role;
      if (action.payload?.username === "admin") finalRole = "Admin";

      return { 
        ...state, 
        loginLoading: false, 
        isAuthenticated: true, 
        user: action.payload?.username, 
        role: finalRole // ✅ Ab ye pakka Admin hoga
      };
      
    case T.LOGIN_FAILURE:
      return { ...state, loginLoading: false, loginFailure: true, loginError: action.payload };
      
    case T.LOGOUT_SUCCESS:
      return INITIAL_STATE;
      
    default:
      return state;
  }
};