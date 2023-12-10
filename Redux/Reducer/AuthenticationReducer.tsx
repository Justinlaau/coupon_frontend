import { SET_BASE_USER } from "../Action/ActionType";

const initialState = {
  baseUser: {
    token: '',
    username: ''
  }
}

export const authenticationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BASE_USER:
      return {
        ...state,
        baseUser: action.data,
      };
    default:
      return state;
  }
};