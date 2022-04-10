import { combineReducers } from 'redux';
import userReducer from './user';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';
import updateColorSchemeReducer from './updateColorSchemeReducer'

const reducers = combineReducers({
  user: userReducer,
  theme: updateColorSchemeReducer
});

export default reducers;
