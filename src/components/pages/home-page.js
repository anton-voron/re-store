import React from 'react';

import BookList from '../book-list/book-list.js'
import ShoppingCartTable from '../shopping-cart-table/shopping-caart-table.js';

const HomePage = () => {

	return (
		<div>
			<BookList/>
			<ShoppingCartTable />
		</div>
	)
}

export default HomePage;