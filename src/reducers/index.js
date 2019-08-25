import updateBookList from './book-list.js';
import updateShoppingCart from './shopping-cart.js';

const initialState = {
  bookList: {
  	books: [],
	loading: true,
	error: null,
  },
  shoppingCart: {
  	cartItems: [],
  	orderTotal: 340,
  }
};



const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_BOOKS_REQUEST':
		case 'FETCH_BOOKS_SUCCESS':
		case 'FETCH_BOOKS_FAILURE':
			return {
				...state,
				bookList: updateBookList(state, action)
			};
		case 'BOOK_ADDED_TO_CART':
		case 'BOOK_REMOVED_FROM_CART':
		case 'ALL_BOOKS_REMOVED_FROM_CART':
			return {
				...state,
				shoppingCart: updateShoppingCart(state, action)
			};
		default: return state;
	}
};

export default reducer;