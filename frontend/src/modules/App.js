import React, { Component } from 'react';

import './App.css';

import Header from './Header';
import { Footer } from './Footer';

export class App extends Component {
	
	render() {
		return (
			<span>
				<Header />
				{this.props.children}
				<Footer />
			</span>
		)
	}
}

