import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import { rootReducer } from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [logger, ReduxThunk];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
