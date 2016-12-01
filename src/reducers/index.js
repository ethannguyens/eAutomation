import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import devices from './deviceReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  devices,
  ajaxCallsInProgress
});

export default rootReducer;
