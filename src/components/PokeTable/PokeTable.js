import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

import PokeTableHead from './PokeTableHead';


import '../../styles/App.css';


const styles = theme => ({
	root: {
		width: 'calc(100% - 30px)',
		maxWidth: 1000,
		margin: '30px auto',
	},
	table: {
		minWidth: 800,
	},
	tableCell: {
		textTransform: 'capitalize',
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	bigAvatar: {
		width: 60,
		height: 60,
	},
	tableLoader: {
		margin: '50px auto',
		textAlign: 'center',
	},
	tableLoaderTitle: {
		fontWeight: '300',
		marginBottom: 10,
	},
	tableLoaderText: {
		fontSize: 14,
		marginBottom: 25,
	},
	progressCircle: {
		display: 'inline-block',
	},
	textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit*2,
    width: 300,
  },
});

class PokeTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			order: 'asc',
			orderBy: 'name',
			selected: [],
			page: 0,
			rowsPerPage: 5,
			searchValue: '',
		}
	}
	


	handleRequestSort = (event, property) => {

		const { pokemonsList } =  this.props;

		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		const pokemonsArray =
			order === 'desc'
				? pokemonsList.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
				: pokemonsList.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

		this.setState({ order, orderBy });
	};

	handleSelectAllClick = (event, checked) => {
		if (checked) {
			this.setState({ selected: this.props.pokemonsList.map(n => n.id) });
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		this.setState({ selected: newSelected });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	handleSearchChange = event => {
    this.setState({
      searchValue: event.target.value,
    });
  };

	isSelected = id => this.state.selected.indexOf(id) !== -1;


	render() {

		const { classes, pokemonsList } = this.props;
		const { order, orderBy, selected, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, pokemonsList.length - page * rowsPerPage);

		let filteredPokemonsList = pokemonsList.filter(
			(pokemonItem) => {
				return pokemonItem.name.toLowerCase().indexOf(this.state.searchValue) !== -1
			}
		);


		return (
			<div className={ `showIn ${classes.root}` }>
				
				<TextField
          id="search"
          label="Search by name"
          className={classes.textField}
          value={this.state.search}
          onChange={(e) => this.handleSearchChange(e)}
          margin="normal"
        />

				<Paper >
					<div className={classes.tableWrapper}>
						{

							pokemonsList.length === 0 ?

							<div className={classes.tableLoader} >
								<h3 className={classes.tableLoaderTitle} >
									Waiting API response 
								</h3>
								<p className={classes.tableLoaderText} >
									API callback sometimes does not work or work very slowly
								</p>
								<CircularProgress className={classes.progressCircle} />
							</div> :
						
							<Table className={classes.table}>
								<PokeTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={this.handleSelectAllClick}
									onRequestSort={this.handleRequestSort}
									rowCount={pokemonsList.length}
								/>
								<TableBody>
									{
										// 
										filteredPokemonsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
										const isSelected = this.isSelected(n.id);
										return (
											<TableRow
												hover
												className="showIn"
												onClick={event => this.handleClick(event, n.id)}
												role="checkbox"
												aria-checked={isSelected}
												tabIndex={-1}
												key={n.id}
												selected={isSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox checked={isSelected} />
												</TableCell>
												<TableCell className={classes.tableCell} padding="none"> 
													<Avatar alt="Alt" src={n.sprites.front_default} className={classes.bigAvatar} />
												</TableCell>
												<TableCell className={classes.tableCell} >{n.name}</TableCell>
												<TableCell className={classes.tableCell} >{n.types[0].type.name}</TableCell>
												<TableCell className={classes.tableCell} >{n.weight}</TableCell>
												<TableCell className={classes.tableCell} >{n.height}</TableCell>
											</TableRow>
										);
									})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 49 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											colSpan={6}
											count={pokemonsList.length}
											rowsPerPage={rowsPerPage}
											page={page}
											backIconButtonProps={{
												'aria-label': 'Previous Page',
											}}
											nextIconButtonProps={{
												'aria-label': 'Next Page',
											}}
											onChangePage={this.handleChangePage}
											onChangeRowsPerPage={this.handleChangeRowsPerPage}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						}
					</div>
				</Paper>
			</div>
		);
	}
}

PokeTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PokeTable);