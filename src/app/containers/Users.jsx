import React, { useEffect, useState } from 'react';
import { getUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import SingleUser from '../components/SingleUser';
import { shape, arrayOf, func } from 'prop-types';
import Loading from '../components/Loading';
import styled from 'styled-components';
import Strings from '../utils/Strings';

const Container = styled.div`
	display:flex;
	flex-direction: column;
	margin: auto;
`;
const H3 = styled.h3`
	text-align: center;
`;
const Input = styled.input`
	font-size: 24px;
	display: flex;
	text-align: center;
	margin: auto;
`;
const strings = Strings();

const Users = ({ getUsers, users }) => {
	const [query, setQuery] = useState('');
	useEffect(()=> {
		getUsers(query);
	}, [query, getUsers]);
	const onKeyUp = e => {
		setQuery(e.target.value);
	};

	return (
		<Container>
			<H3>{strings.selectUser}</H3>
			<Input onKeyUp={onKeyUp}/>
			{users ? (
				<Container>
					{users.map((user, index)=><SingleUser data={user} key={`user-${index}`} />)}
				</Container>
			) : (
				<Loading/>
			)}
		</Container>
	);
};

const mapStateToProps = state => ({
	...state.userReducer,
});

const mapDispatchToProps = dispatch => ({
	getUsers: (...props) => dispatch(getUsers(...props)),
});

Users.propTypes = {
	getUsers: func.isRequired,
	users: arrayOf(shape({}))
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);