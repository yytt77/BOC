import { combineReducers } from 'redux';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';
import userReducer from './user';

const reducers = combineReducers({
  uploadProfilePictureClickCount: uploadProfilePictureReducer,
  user: userReducer
});

export default reducers;
