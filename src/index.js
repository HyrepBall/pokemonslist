import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
	pokemons: [],
};

function pokemonslist(state = initialState, action) {
	if (action.type === 'ADD_POKEMON') {
		return {
			...state,
			pokemons: [...state.pokemons, action.payload],
		};
	}
	return state;
};

const store = createStore(pokemonslist);


ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
