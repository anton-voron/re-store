import React, { Component } from 'react';
import { connect } from 'react-redux';
/*import { bindActionCreators } from 'redux';*/

import './book-list.css';

import BookListItem from '../book-list-item/book-list-item.js';
import Spinner from '../spinner/spinner.js';
import ErrorIndicator from '../error-indicator/error-indicator.js';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';

class BookList extends Component {

	componentDidMount() {
		// 1. recive data
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
	}

	render() {
		const {books, loading, error} = this.props;
		const item = books.map((book) => {
			return (
				<li key={book.id}>
					<BookListItem book={book} />
				</li>
			)
		});
		if(loading) {return <Spinner />}
		if(error) {return <ErrorIndicator />}
		return (
			<ul className = "book-list">
				{item}
			</ul>
		);
	}
}

const mapStateToProps = ({books, loading, error}) => {
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

/*const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		booksLoaded
	}, dispatch)
}*/
const mapDispatchToProps = {
	booksLoaded,
	booksRequested,
	booksError,
};

export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
  )(BookList);