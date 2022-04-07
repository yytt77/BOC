import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

export const store = createStore(
  reducers,
  //default state
  {
    user: null
  },
  applyMiddleware(thunk)
);
