import { combineReducers } from 'redux';
import authReducer from './authReducer';
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
