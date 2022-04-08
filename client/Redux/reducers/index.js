import { combineReducers } from 'redux';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';
import userAuthReducer from './userAuthReducer';

const reducers = combineReducers({
  uploadProfilePictureClickCount: uploadProfilePictureReducer,
  user: userAuthReducer
});

export default reducers;
