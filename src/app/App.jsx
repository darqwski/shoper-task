import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Users from './containers/Users';
import UserDetails from './containers/UserDetails';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Route exact path="/" component={Users} />
			<Route exact path="/user/:id" component={UserDetails} />
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object
};

export default Root;