import styled from 'styled-components';

const Fieldset = styled.fieldset`
	border: none;
	
	&>div {
		display: flex;
		flex-direction: column;
	}
	&> div > * {
		margin: 5px 0px;
	}
	& input {
		font-size: 1.1em;
	}
`;

export default Fieldset;