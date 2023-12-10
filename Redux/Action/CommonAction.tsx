import {
  TOGGLE_LOADING,
  TOGGLE_SUCCESS_POPUP, 
  TOGGLE_ERROR_POPUP,
  TOGGLE_OPERATION_POPUP,
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_OPERATION_MESSAGE,
  SET_USER_INFO,
} from "./ActionType";

export const toggleLoading = (data: any) => ({
  type: TOGGLE_LOADING,
  data
});

export const toggleMessagePopup = (data: any, messageType: String) => ({
  type: messageType,
  data
});

export const setMessagePopup = (data: any, messageType: string) => ({
  type: messageType,
  data
});
