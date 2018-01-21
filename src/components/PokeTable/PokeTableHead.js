import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

import '../../styles/App.css';



const columnData = [
  { id: 'avatar', numeric: false, disablePadding: true, width: 100, label: 'Avatar' },
  { id: 'name', numeric: false, disablePadding: false, width: 'auto', label: 'Name' },
  { id: 'type', numeric: false, disablePadding: false, width: 'auto', label: 'Type' },
  { id: 'weight', numeric: false, disablePadding: false, width: '50px', label: 'Weight' },
  { id: 'height', numeric: false, disablePadding: false, width: '50px', label: 'Height' },
];




class PokeTableHead extends Component {

	createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };


	render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;


    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" style={{ width: 60, }} >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
                style={{ width: column.width }}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

PokeTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default PokeTableHead;
