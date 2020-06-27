import * as types from '../actions/postActions';

const initialState = {
	posts: null,
	post: null
};

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
	case types.GET_USER_POSTS:
		return {
			...state,
			posts: action.data
		};
	case types.GET_USER_POST:
		return {
			...state,
			posts: [action.data[0]]
		};
	case types.GET_POST_COMMENTS:

		return {
			...state,
			posts: state.posts.map(item=>(
				(+item.id !== +action.postId) ? item : {
					...item,
					comments: action.data
				}
			))

		};
	default:
		return state;
	}
};