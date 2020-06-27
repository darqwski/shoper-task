import * as types from '../actions/userActions';

const initialState = {
	users: null,
	userDetails: null
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case types.GET_USERS:
		return {
			...state,
			users: action.users
		};
	case types.GET_USER:
		return {
			...state,
			userDetails: action.data
		};
	default:
		return state;
	}
};