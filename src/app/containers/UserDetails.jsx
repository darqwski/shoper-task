import React, { useEffect, useState } from 'react';
import { string, shape, arrayOf, func } from 'prop-types';
import styled from 'styled-components';
import { getUser } from '../actions/userActions';
import { connect } from 'react-redux';
import SinglePost from '../components/SinglePost';
import Loading from '../components/Loading';
import AppRequest from '../utils/AppRequest';
import Strings from '../utils/Strings';
import { Button } from '@material-ui/core';
import Fieldset from '../components/Fieldset';
import { getPostComments, getUserPost, getUserPosts } from '../actions/postActions';

const strings = Strings();

const Title = styled.h3`
text-align: center;
`;
const Container = styled.div`
	padding: 15px;
	margin: 40px;
`;

const Users = ({ getUser, getUserPost, getUserPosts, getPostComments, match: { params: { id } }, posts, userDetails }) => {
	const { first_name, last_name, phone, email, id: userId } = userDetails || {};
	const [morePosts, setMorePosts] = useState(false);
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	useEffect(()=> {
		getUser(id);
	}, [getUser, id]);
	useEffect(()=> {
		getUserPost(id);
	}, [getUserPost, id]);
	useEffect(()=>{
		setFirstName(first_name);
		setLastName(last_name);
	}, [userDetails]);
	const onSubmit = e=>{
		e.preventDefault();
		AppRequest(`https://gorest.co.in/public-api/users/${userId}`, {
			method: 'PUT',
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName
			})
		});
	};

	return (
		<div>
			<Title>{strings.userDetails}</Title>
			<Container className="shadow">
				<h5>{first_name} {last_name}</h5>
				<h5>{phone} {email}</h5>
				<form onSubmit={onSubmit}>
					<Fieldset>
						<legend>{strings.changeUserData}</legend>
						<div>
							<label htmlFor="firstName">{strings.firstName}</label>
							<input
								type="text"
								id="firstName"
								value={firstName}
								onChange={e=>setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="lastName">{strings.lastName}</label>
							<input
								type="text"
								id="lastName"
								value={lastName}
								onChange={e=>setLastName(e.target.value)}
							/>
						</div>
						<Button variant="contained" color="primary" type="submit">{strings.save}</Button>
					</Fieldset>
				</form>
			</Container>
			<Title>{strings.userPosts}</Title>
			{posts ? (
				posts.map((singlePost, index)=>(
					<SinglePost
						data={singlePost}
						getPostComments={getPostComments}
						userDetails={userDetails}
						key={`single-post-${id}-${index}`}
					/>
				))
			): (
				<Loading />
			)}
			{!morePosts && (
				<Button color="primary" onClick={()=>{
					getUserPosts(id);
					setMorePosts(true);
				}}>{strings.loadMore}...</Button>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	...state.userReducer,
	...state.postReducer
});

const mapDispatchToProps = dispatch => ({
	getUser: (...props) => dispatch(getUser(...props)),
	getUserPosts: (...props) => dispatch(getUserPosts(...props)),
	getUserPost: (...props) => dispatch(getUserPost(...props)),
	getPostComments: (...props) => dispatch(getPostComments(...props))
});

Users.propTypes = {
	getUser: func.isRequired,
	getUserPost: func.isRequired,
	getUserPosts: func.isRequired,
	getPostComments: func.isRequired,
	match: shape({ params: { id: string } }),
	posts: arrayOf(shape({})),
	userDetails: shape({
		first_name: string,
		last_name: string,
		phone: string,
		email: string,
		id: string
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);