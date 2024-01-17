import { 
  TOGGLE_LOADING,
  TOGGLE_SUCCESS_POPUP,
  TOGGLE_ERROR_POPUP,
  TOGGLE_OPERATION_POPUP,
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_OPERATION_MESSAGE,
  SET_ERROR_CALLBACK,
  SET_SUCCESS_CALLBACK,
  SET_OPERATION_CALLBACK,
} from "../Action/ActionType";

const initialState = {
  data: {
    commonLoading: false,
    errorPopup: false,
    successPopup: false,
    operationPopup: false,
    successPopupMessage: "success",
    errorPopupMessage: "error",
    operationPopupMessage: "info",
    successPopupCallback: () => {},
    errorPopupCallback: () => {},
    operationPopupCallback: () => {},
    userInfo: {},
  },
};


export const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        data: {
          ...state.data,
          commonLoading: action.data,
        },
      };
      // hard code for now, TODO: change to a generic/dynamic action type
      // TODO: May be a single popup reducer is enough
    case TOGGLE_SUCCESS_POPUP:
      return {
        ...state,
        data: {
          ...state.data,
          successPopup: action.data,
        },
      };
    case TOGGLE_ERROR_POPUP:
      return {
        ...state,
        data: {
          ...state.data,
          errorPopup: action.data,
        },
      };
    case TOGGLE_OPERATION_POPUP:
      return {
        ...state,
        data: {
          ...state.data,
          [action.type]: action.data,
        },
      };
    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        data: {
          ...state.data,
          successPopupMessage: action.data,
        },
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        data: {
          ...state.data,
          errorPopupMessage: action.data,
        },
      };
    case SET_OPERATION_MESSAGE:
      return {
        ...state,
        data: {
          ...state.data,
          operationPopupMessage: action.data,
        },
      };
    case SET_ERROR_CALLBACK:
      return {
        ...state,
        data: {
          ...state.data,
          errorPopupCallback: action.callback(),
        }
      }
    case SET_SUCCESS_CALLBACK:
      return {
        ...state,
        data: {
          ...state.data,
          successPopupCallback: () => action.callback(),
        }
      }
    case SET_OPERATION_CALLBACK:
      return {
        ...state,
        data: {
          ...state.data,
          operationPopupCallback: () => action.callback(),
        }
      }
    default:
      return state;
  }
}

