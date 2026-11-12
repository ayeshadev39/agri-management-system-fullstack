import { login, logout, getSession } from "../../api/user";
import { FAILURE, REQUEST, SUCCESS, USER_REQUEST } from "../utilities";

export function LOGIN(data, moveToNext, failure) {
  return (dispatch) => {
    dispatch(REQUEST(USER_REQUEST.LOGIN_REQUEST));
    login(data).then((res) => {
      if (res.data.succeeded) {
        dispatch(SUCCESS(USER_REQUEST.LOGIN_SUCCESS, res.data.data));
        if (moveToNext) moveToNext();
      } else {
        dispatch(FAILURE(USER_REQUEST.LOGIN_FAILURE, res.data.message));
        if (failure) failure(res.data.message);
      }
    });
  };
}

export function LOGOUT(moveToNext) {
  return (dispatch) => {
    dispatch(REQUEST(USER_REQUEST.LOGOUT_REQUEST));
    logout().then(() => {
      dispatch(SUCCESS(USER_REQUEST.LOGOUT_SUCCESS));
      if (moveToNext) moveToNext();
    });
  };
}

export function GETSESSION(moveToNext) {
  return (dispatch) => {
    const res = getSession();
    if (res.data.succeeded) {
      dispatch(SUCCESS(USER_REQUEST.LOGIN_SUCCESS, res.data.data));
      if (moveToNext) moveToNext();
    }
  };
}