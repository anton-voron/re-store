import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './book-list.css';

import BookListItem from '../book-list-item/book-list-item.js';
import Spinner from '../spinner/spinner.js';
import ErrorIndicator from '../error-indicator/error-indicator.js';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';

class BookListContainer extends Component {

	componentDidMount() {
		/*// 1. recive data
		const {bookstoreService, booksLoaded, booksRequested, booksError} = this.props;
		booksRequested();
		bookstoreService.getBooks()
			.then((data) => {
				// 2. dispatch action to
				booksLoaded(data)
			})
			.catch((err) => booksError(err));

		/* 2. dispatch action to 
		this.props.booksLoaded(data);*/

		this.props.fetchBooks(); // выносим всю логику получения данных в отдельную функцию, которую мы создали в
		// mapDispatchToProps
	}

	render() {
		const {books, loading, error, onAddedToCart} = this.props;
		

		if(loading) { return <Spinner /> }
		if(error) { return <ErrorIndicator /> }

		return <BookList books={books} onAddedToCart={onAddedToCart}/>
	}
}

const BookList = ({books, onAddedToCart}) => {
	let item = books.map((book) => {
		return (
			<li key={book.id}>
				<BookListItem book={book} 
				onAddedToCart = {() => onAddedToCart(book.id)}/>
			</li>
		)
	});
	return (
		<ul className = "book-list">
			{item}
		</ul>
	);
}

const mapStateToProps = ({bookList: {books, loading, error}}) => {
	return { books, loading, error }
}

/*const mapDispatchToProps = (dispatch) => {
	return {
		booksLoaded: (newBooks) => {
			/*dispatch({
				type: 'BOOKS_LOADED',
				payload: newBooks,
			});*//*
			dispatch(booksLoaded(newBooks))
		}
	};
};*/
/*const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		booksLoaded
	}, dispatch)
}*/

/*const mapDispatchToProps = {
	booksLoaded,
	booksRequested,
	booksError,
};*/


// ownProps - свойства, которые создаёт withBookstoreService и передаёт дочерним компонентам. 
// нужнен нам, чтобы вызвать свойства из контекста в redux обертке  

/*const mapDispatchToProps = (dispatch, ownProps) => {
	const { bookstoreService } = ownProps; // достаём сервис из withBookstoreService через ownProps
	return {
		fetchBooks: () => {
			dispatch(booksRequested()); // пока что booksRequested - это обычный акшин крейтор, нам нужно обенуть его в dispatch
			bookstoreService.getBooks()
			.then((data) => dispatch(booksLoaded(data)))
			.catch((err) => dispatch(booksError(err)));
		}
	}
}*/

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
	// Деструктурируем bookstoreService из ownProps
	return bindActionCreators({
		//fetchBooks: fetchBooks(dispatch, bookstoreService), // создали в action-creators функцию, импортировали её и вызвали
		fetchBooks: fetchBooks(bookstoreService),
		onAddedToCart: bookAddedToCart
	}, dispatch)
}

export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
  )(BookListContainer);