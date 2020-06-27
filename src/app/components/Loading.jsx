import React from 'react';
import Strings from '../utils/Strings';
const strings = Strings();

const Loading = ()=>(
	<div>
		{strings.loading}...
	</div>
);

export default Loading;