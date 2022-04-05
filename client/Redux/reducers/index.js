import { combineReducers } from 'redux';
import uploadProfilePictureReducer from './uploadProfilePictureReducer';

const reducers = combineReducers({
  uploadProfilePictureClickCount: uploadProfilePictureReducer
});

export default reducers;