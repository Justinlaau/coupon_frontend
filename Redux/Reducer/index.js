import {combineReducers} from 'redux';
import { commonReducer } from './CommonReducer';
import { authenticationReducer } from './AuthenticationReducer';

const rootReducer = combineReducers({
  authenticationReducer,
  commonReducer,
});
export default rootReducer;