import React, { useState } from 'react';
import { string, shape, func } from 'prop-types';
import styled from 'styled-components';
import SingleComment from './SingleComment';
import AppRequest from '../utils/AppRequest';
import Strings from '../utils/Strings';
import { Button } from '@material-ui/core';
import Fieldset from './Fieldset';

const strings = Strings();

const Container = styled.div`
	padding: 15px;
	margin: 40px;
`;

const SinglePost = ({ data: { body, title, id, comments }, getPostComments, userDetails }) => {
	const [comment, setComment] = useState();
	const onSubmit = e => {
		const { email, first_name, last_name } = userDetails;
		e.preventDefault();
		AppRequest('https://gorest.co.in/public-api/comments', {
			method: 'POST',
			body: JSON.stringify({
				email,
				post_id: id,
				body: comment,
				name: `${first_name} ${last_name}`
			})
		})
			.then(()=>{
				setComment('');
				getPostComments(id);
			});
	};

	return (
		<Container className="shadow">
			<h4>{title}</h4>
			<p>{body}</p>
			{comments ? (
				<div>
					{comments.map((item, index)=><SingleComment data={item} key={`comment-${id}-${index}`} />)}
					<form onSubmit={onSubmit}>
						<Fieldset>
							<legend>{strings.addComment}</legend>
							<div>
								<input type="text" onChange={e=>setComment(e.target.value)} value={comment} />
							</div>
							<Button color="primary" variant="contained" type="submit">{strings.save}</Button>
						</Fieldset>
					</form>
				</div>
			): (
				<Button color="primary" onClick={()=>getPostComments(id)}>
					{strings.comments}
				</Button>
			)}
		</Container>
	);
};

SinglePost.propTypes = {
	data: shape({
		body: string,
		title: string,
		id: string,
		comments: string
	}).isRequired,
	getPostComments: func.isRequired,
	userDetails: shape({
		email: string,
		first_name: string,
		last_name: string
	})
};

export default SinglePost;