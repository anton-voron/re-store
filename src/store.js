import { createStore, /*compose,*/ applyMiddleware } from 'redux';
import  thunkMiddleware from 'redux-thunk'
import reducer from './reducers';

/*const originalDispatch = store.dispatch;
//Monkey patching нужно использовать толкьо, когда библиотека не поддерживает расширение
//В Редакс есть два способа ктр поддерживают такое расширение (поэтому manky patching не используем)
store.dispatch = (action) => {

	if( typeof action === 'string') {
		return originalDispatch({
			type: action
		});
	}
	originalDispatch(action)
};*/

const logEnhancer = (createStore) => (...args) => {
	const store = createStore(...args);
	const originalDispatch = store.dispatch;
	store.dispatch = (action) => {
		console.log(action.type);
		return originalDispatch(action);
	}

	return store;	
};

const stringEnhancer = (createStore) => (...args) => {
	const store = createStore(...args);
	const originalDispatch = store.dispatch;
	store.dispatch = (action) => {

		if(typeof action === 'string') {
			return originalDispatch({
				type: action
			});
		}

		return originalDispatch(action);
	}

	return store;	
};
// enhancer - изменяет наш store, добавляем чтобы наша функция могла принимать ещё и строки и приложение не ломалось
//Чтобы объеденить две функции нам нужно создаватьь композицию, но в Redux есть встроенная функция compose 
// Enhencer нужно использовать крайне редко, так как существует Middlware
/*const store = createStore(reducer, compose (stringEnhancer, logEnhancer)); */

const logMiddlware = (store) => (dispatch) => (action) => {
	console.log(action.type, store.getState());
	return dispatch(action);
};

const stringMiddleware = () => (dispatch) => (action) => {
		if(typeof action === 'string') {
			return dispatch({
				type: action
			});
		}

		return dispatch(action);
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddlware));


const delayedActionCreator = (timeout) => (dispatch) => {
	setTimeout(() => {dispatch({
			type: 'DELAYED_ACNTION'
		})
	}, timeout)
};

store.dispatch(delayedActionCreator(3000));

export default store;