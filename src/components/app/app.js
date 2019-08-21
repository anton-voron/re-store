import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './app.css';

import { withBookstoreService } from '../hoc/';
import { HomePage, CartPage } from '../pages';
import ShopHeader from '../shop-header/shop-header.js';

const App = ({bookstoreService}) => {
	console.log(bookstoreService.getBooks())
	return (
		<main role="main" className="container">				
			<ShopHeader numItem={5} total={210}/>
			<Switch> 
				<Route path='/' exact={true} component={HomePage}/>
				<Route path='/cart' component={CartPage}/>
			</Switch>
		</main>
	)
}

export default withBookstoreService()(App);

//Switch делает, чтобы отображался только один Route, как только отобрзился 1 роут, остальные скрываются