import { combineReducers } from 'redux';
import example from './example';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  example,
});

export default rootReducer;
