import { combineReducers } from 'redux';

import { fetchDataReducer } from './reducers/calender.reducer';

export const rootReducer = combineReducers({
  fetchDataReducer,
});
