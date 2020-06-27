import React from 'react';
import { Link } from 'react-router-dom';
import { string, shape } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	flex-grow: 1;
	padding: 15px;
	margin: 10px;
`;
const User = styled.p`
	color: #333;
`;

const SingleUser = ({ data: { id, first_name, last_name } }) => (
	<Link to={`/user/${id}`}>
		<Container className="shadow clickable">
			<User> {first_name} {last_name} </User>
		</Container>
	</Link>
);

SingleUser.propTypes = {
	data: shape({
		id: string,
		first_name: string,
		last_name: string
	}).isRequired
};

export default SingleUser;