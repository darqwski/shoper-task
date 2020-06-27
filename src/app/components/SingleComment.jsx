import React from 'react';
import styled from 'styled-components';
import { string, shape } from 'prop-types';

const Container = styled.div`
	padding: 10px;
	margin: 10px 0px 10px 80px;
`;

const SingleComment = ({ data: { body, email } }) => (
	<Container className="shadow">
		<p>{body}</p>
		<div>
			<span>{email}</span>
		</div>
	</Container>
);

SingleComment.propTypes = {
	data: shape({
		body: string,
		email: string
	}).isRequired
};

export default SingleComment;