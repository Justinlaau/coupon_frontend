import {combineReducers} from 'redux';
import {nameReducer} from './NameReducer';
import { commonReducer } from './CommonReducer';

const rootReducer = combineReducers({
  nameReducer,
  commonReducer,
});
export default rootReducer;