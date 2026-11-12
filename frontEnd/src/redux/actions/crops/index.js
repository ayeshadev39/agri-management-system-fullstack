import { getCrops, createCrop, updateCrop, removeCrop } from "../../api/crops";
import { FAILURE, REQUEST, SUCCESS, CROP_REQUEST } from "../utilities";

export function GETCROPS(failure) {
  return (dispatch) => {
    dispatch(REQUEST(CROP_REQUEST.GET_CROPS_REQUEST));
    getCrops().then((response) => {
      // ✅ Backend response.data.data me data bhejta hai
      if (response.data.succeeded) {
        dispatch(SUCCESS(CROP_REQUEST.GET_CROPS_SUCCESS, response.data.data));
      } else {
        dispatch(FAILURE(CROP_REQUEST.GET_CROPS_FAILURE, response.data.message));
        if (failure) failure(response.data.message);
      }
    }).catch((error) => {
      dispatch(FAILURE(CROP_REQUEST.GET_CROPS_FAILURE, error.message));
      if (failure) failure(error.message);
    });
  };
}

export function ADDCROP(cropData, moveToNext, failure) {
  return (dispatch) => {
    dispatch(REQUEST(CROP_REQUEST.ADD_CROP_REQUEST));
    createCrop(cropData).then((response) => {
      if (response.data.succeeded) {
        dispatch(SUCCESS(CROP_REQUEST.ADD_CROP_SUCCESS, response.data.data));
        if (moveToNext) moveToNext();
      } else {
        dispatch(FAILURE(CROP_REQUEST.ADD_CROP_FAILURE, response.data.message));
        if (failure) failure(response.data.message);
      }
    }).catch((error) => {
      dispatch(FAILURE(CROP_REQUEST.ADD_CROP_FAILURE, error.message));
      if (failure) failure(error.message);
    });
  };
}

export function UPDATECROP(cropData, moveToNext, failure) {
  return (dispatch) => {
    dispatch(REQUEST(CROP_REQUEST.UPDATE_CROP_REQUEST));
    updateCrop(cropData).then((response) => {
      if (response.data.succeeded) {
        dispatch(SUCCESS(CROP_REQUEST.UPDATE_CROP_SUCCESS, response.data.data));
        if (moveToNext) moveToNext();
      } else {
        dispatch(FAILURE(CROP_REQUEST.UPDATE_CROP_FAILURE, response.data.message));
        if (failure) failure(response.data.message);
      }
    }).catch((error) => {
      dispatch(FAILURE(CROP_REQUEST.UPDATE_CROP_FAILURE, error.message));
      if (failure) failure(error.message);
    });
  };
}

export function REMOVECROP(id, moveToNext, failure) {
  return (dispatch) => {
    dispatch(REQUEST(CROP_REQUEST.REMOVE_CROP_REQUEST));
    removeCrop(id).then((response) => {
      if (response.data.succeeded) {
        dispatch(SUCCESS(CROP_REQUEST.REMOVE_CROP_SUCCESS, id));
        if (moveToNext) moveToNext();
      } else {
        dispatch(FAILURE(CROP_REQUEST.REMOVE_CROP_FAILURE, response.data.message));
        if (failure) failure(response.data.message);
      }
    }).catch((error) => {
      dispatch(FAILURE(CROP_REQUEST.REMOVE_CROP_FAILURE, error.message));
      if (failure) failure(error.message);
    });
  };
}