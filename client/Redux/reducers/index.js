import { combineReducers } from 'redux';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';
import userAuthReducer from './userAuthReducer';
import userReducer from './user';

const reducers = combineReducers({
  uploadProfilePictureClickCount: uploadProfilePictureReducer,
  authorizedUser: userAuthReducer,
  user: userReducer
});

export default reducers;
