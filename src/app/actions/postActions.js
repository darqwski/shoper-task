import AppRequest from '../utils/AppRequest';

export const GET_USER_POSTS = 'GET_USER_POSTS';
export const GET_USER_POST = 'GET_USER_POST';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';


export const getUserPosts = id => dispatch => {
	AppRequest(`https://gorest.co.in/public-api/posts?user_id=${id}`)
		.then(response=>response.json())
		.then(({ result })=>{
			dispatch({
				data: result,
				type: GET_USER_POSTS
			});
		});
};

//Standard API with limiting to one post is not working
//Lets assume, that urlParam limit is pageSize
export const getUserPost = id => dispatch => {
	AppRequest(`https://gorest.co.in/public-api/posts?user_id=${id}&limit=1`)
		.then(response=>response.json())
		.then(({ result })=>{
			dispatch({
				data: result,
				type: GET_USER_POST
			});
		});
};

export const getPostComments = id => dispatch => {
	AppRequest(`https://gorest.co.in/public-api/comments?post_id=${id}`)
		.then(response=>response.json())
		.then(({ result })=>{
			dispatch({
				data: result,
				type: GET_POST_COMMENTS,
				postId: id
			});
		});
};
