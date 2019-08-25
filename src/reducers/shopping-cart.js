const updateOrder = (state, id, quantity) => {
	const { bookList: { books }, shoppingCart: { cartItems } } = state;
	const book = books.find((book) => book.id === id);
	const bookIndex = cartItems.findIndex((book) => book.id === id);
	const itemCart = cartItems[bookIndex];

	const newItem = updateItem(book, itemCart, quantity);
	return {
		orderTotal: 0,
		cartItems: updateCartItems(cartItems, newItem, bookIndex)
	};
}

const updateItem = (book, item = {}, quantity) => {

	const { 
		id = book.id, 
		count = 0, 
		title = book.title, 
		price = 0 
	} = item;

	return {
		id,
		title,
		count: count + quantity,
		price: price + quantity*book.price
	}
};

const updateCartItems = (cartItems, item, idx) => {

	if(item.count === 0) {
		return [
		...cartItems.slice(0, idx),
		...cartItems.slice(idx + 1)
		]
	}

	if(idx === -1) {
		return [
			...cartItems,
			item
		];
	}

	return [
	...cartItems.slice(0, idx),
	item,
	...cartItems.slice(idx + 1)
	];
};

const updateShoppingCart = (state, action) => {
	switch(action.type) {
		case 'BOOK_ADDED_TO_CART':
			return updateOrder(state, action.payload, 1);

		case 'BOOK_REMOVED_FROM_CART':
			return updateOrder(state, action.payload, -1);

		case 'ALL_BOOKS_REMOVED_FROM_CART':
			const { cartItems } = state.shoppingCart;
			const item = cartItems.find(book  => book.id === action.payload);
			const count = item.count;
			return updateOrder(state, action.payload, -count);

		default: 
			return state.shoppingCart
	}
};

export default updateShoppingCart;