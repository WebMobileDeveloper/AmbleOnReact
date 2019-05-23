import { combineReducers } from 'redux';

import authReducer from './authReducer';
import toursReducer from './toursReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tours: toursReducer,
});

export default rootReducer;
