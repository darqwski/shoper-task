import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { postReducer } from './postReducer';

const templateReducers = combineReducers({
	userReducer,
	postReducer
});

export default templateReducers;