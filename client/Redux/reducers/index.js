import { combineReducers } from 'redux';
import userReducer from './user';
import updateColorSchemeReducer from './updateColorSchemeReducer';
import authScreenReducer from './authScreenReducer';
import guestHomeReducer from './guestHomeReducer';
import notificationReducer from './notificationReducer';

const reducers = combineReducers({
  user: userReducer,
  theme: updateColorSchemeReducer,
  authScreen: authScreenReducer,
  guestHome: guestHomeReducer,
  notification: notificationReducer
});

export default reducers;
