import { combineReducers } from 'redux';
//import simpleReducer from './simpleReducer';
import globalReducer from './globalReducer';

export default combineReducers({
  // simpleReducer,
  global: globalReducer,
});
