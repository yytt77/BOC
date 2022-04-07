import { combineReducers } from 'redux';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';
import userAuthReducer from './userAuthReducer';

const reducers = combineReducers({
  uploadProfilePictureClickCount: uploadProfilePictureReducer,
  authorizedUser: userAuthReducer
});

export default reducers;