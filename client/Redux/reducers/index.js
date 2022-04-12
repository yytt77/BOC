import { combineReducers } from 'redux';
import userReducer from './user';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';
import updateColorSchemeReducer from './updateColorSchemeReducer';
import authScreenReducer from './authScreenReducer';
import guestHomeReducer from './guestHomeReducer';

const reducers = combineReducers({
  user: userReducer,
  theme: updateColorSchemeReducer,
  authScreen: authScreenReducer,
  guestHome: guestHomeReducer
});

export default reducers;
