import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import PokeTable from './components/PokeTable/PokeTable';

import './styles/App.css';

class App extends Component {

	componentDidMount() {

		// Found in the API only get Pokémon one by one through their id
		// No call of the entire list with one request
		// Very slowly

		var id = 1;

		for ( id; id <= 30 ; id++ ) {
			// http://pokeapi.salestock.net/api/v2/
			// https://cors.now.sh/https://pokeapi.co/api/v2/
			axios.get(`https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((response) => {
				this.props.onAddPokemon(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

  render() {
    return (
      <div className="App">
        <PokeTable pokemonsList={this.props.pokemons} />
      </div>
    );
  }
}

export default connect(
	state => ({
		pokemons: state.pokemons
	}),
	dispatch => ({
		onAddPokemon: (pokemonObj) => {
			dispatch({ type: 'ADD_POKEMON', payload: pokemonObj })
		}
	}),
)(App);
