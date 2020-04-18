import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createPromise } from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer.js';

const middlewares = [createPromise(), thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

export default store;
