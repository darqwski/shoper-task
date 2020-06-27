import AppRequest from '../utils/AppRequest';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';

export const getUsers = query => dispatch => {
	AppRequest(`https://gorest.co.in/public-api/users?last_name=${query}`)
		.then(response=>response.json())
		.then(({ result })=>{
			dispatch({
				users: result,
				type: GET_USERS
			});
		});
};

export const getUser = id => dispatch => {
	AppRequest(`https://gorest.co.in/public-api/users/${id}`)
		.then(response=>response.json())
		.then(({ result })=>{
			dispatch({
				data: result,
				type: GET_USER
			});
		});
};
