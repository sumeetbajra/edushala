import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './modules/App';
import Homepage from './modules/Home';
import LoginPage from './modules/Login';
import RegisterPage from './modules/Register';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Homepage} />
		<Route path="/login" component={LoginPage} />
		<Route path="/register" component={RegisterPage} />
	</Route>
)
