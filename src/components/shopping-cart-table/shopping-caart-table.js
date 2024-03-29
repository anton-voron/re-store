import React from 'react';
import { connect } from 'react-redux';

import './shopping-caart-table.css';

import { bookAddedToCart, bookRemovedFromCart, allBooksRemovedFromCart } from '../../actions'

const ShoppingCartTable = ({items, total, onIncrease, onDecrease, onDelete }) => {

	const renderRow = (item, idx) => {
		const {id, title, count, price} = item;
			return (
				<tr key={id}>
          <td>{idx + 1}</td>
          <td>{title}</td>
          <td>{count}</td>
          <td>${price}</td>
          <td>
            <button 
            onClick = {() => onDelete(id)}
            className="btn btn-outline-danger btn-sm float-right">
              <i className="fa fa-trash-o" />
            </button>
            <button 
            onClick = {() => onIncrease(id)}
            className="btn btn-outline-success btn-sm float-right">
              <i className="fa fa-plus-circle" />
            </button>
            <button 
            onClick = {() => onDecrease(id)}
            className="btn btn-outline-warning btn-sm float-right">
              <i className="fa fa-minus-circle" />
            </button>
          </td>
       </tr>
			);
	}
	
	return(
		<div>
			<h2>Your Order</h2>
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Item</th>
						<th>Count</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{
						items.map(renderRow)
					}
				</tbody>
			</table>

			<div className="total">
        		Total: ${total}
      		</div>
		</div>
	);	
};

const mapStateToProps = ({ shoppingCart: {cartItems, orderTotal}} ) => {
	return {
		items: cartItems,
		total: orderTotal
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIncrease: (bookId) => dispatch(bookAddedToCart(bookId)),
		onDecrease: (bookId) => dispatch(bookRemovedFromCart(bookId)),
		onDelete: (bookId) => dispatch(allBooksRemovedFromCart(bookId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);