const API_KEY = 'k8xd3P-MbyTQ0uNbIKxL3M9yPyKxvCHInj_p';

export default (address, options = {}) => fetch(address,{
	...options,
	headers: {
		...(options.headers || {}),
		'Authorization': `Bearer ${API_KEY}`,
		'Content-Type': 'application/json'
	}
});
