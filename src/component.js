import uuid from '@sanity/uuid';
import React from 'react';
import PropTypes from 'prop-types';
import Table from './components/table';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import FieldSet from 'part:@sanity/components/fieldsets/default';
import ButtonCollection from 'part:@sanity/components/buttons/button-collection';
import Button from 'part:@sanity/components/buttons/default';

const createPatchFrom = value => {
  return PatchEvent.from(set(value));
};

export default class TableInput extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      options: PropTypes.object,
    }).isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  updateCell = (e, rowIndex, cellIndex) => {
    const { value, onChange } = this.props;
    // Clone the current table data
    const newValue = { ...value };
    newValue.rows[rowIndex].cells[cellIndex] = e.target.value;
    return onChange(createPatchFrom(newValue));
  };

  initializeTable = () => {
    const { onChange } = this.props;
    // Add a single row with a single empty cell (1 row, 1 column)
    const newValue = { rows: [{ _type: 'row', _key: uuid(), cells: [''] }] };
    return onChange(createPatchFrom(newValue));
  };

  addRow = e => {
    const { value, onChange } = this.props;
    // If we have an empty table, create a new one
    if (!value) return this.initializeTable();
    // Clone the current table data
    const newValue = { ...value };
    // Calculate the column count from the first row
    const columnCount = value.rows[0].cells.length;
    // Add as many cells as we have columns
    newValue.rows.push({
      _type: 'row',
      _key: uuid(),
      cells: Array(columnCount).fill(''),
    });
    return onChange(createPatchFrom(newValue));
  };

  removeRow = index => {
    const { value, onChange } = this.props;
    // Clone the current table data
    const newValue = { ...value };
    // Remove the row via index
    newValue.rows.splice(index, 1);
    // If the last row was removed, clear the table
    if (!newValue.rows.length) {
      this.clear();
    }
    return onChange(createPatchFrom(newValue));
  };

  addColumn = e => {
    const { value, onChange } = this.props;
    // If we have an empty table, create a new one
    if (!value) return this.initializeTable();
    // Clone the current table data
    const newValue = { ...value };
    // Add a cell to each of the rows
    newValue.rows.forEach((row, i) => {
      newValue.rows[i].cells.push('');
    });
    return onChange(createPatchFrom(newValue));
  };

  removeColumn = index => {
    const { value, onChange } = this.props;
    // Clone the current table data
    const newValue = { ...value };
    // For each of the rows, remove the cell by index
    newValue.rows.forEach(row => {
      row.cells.splice(index, 1);
    });
    // If the last cell was removed, clear the table
    if (!newValue.rows[0].cells.length) {
      this.clear();
    }
    return onChange(createPatchFrom(newValue));
  };

  // Unsets the entire table value
  clear = () => {
    const { onChange } = this.props;
    return onChange(PatchEvent.from(unset()));
  };

  render() {
    const { type, value } = this.props;
    const { title, description, options } = type;

    const table =
      value && value.rows && value.rows.length ? (
        <Table
          rows={value.rows}
          updateCell={this.updateCell}
          removeColumn={this.removeColumn}
          removeRow={this.removeRow}
        />
      ) : null;

    const buttons = value ? (
      <ButtonCollection>
        <Button inverted onClick={this.addRow}>
          Add Row
        </Button>
        <Button inverted onClick={this.addColumn}>
          Add Column
        </Button>
        <Button inverted color="danger" onClick={this.clear}>
          Clear
        </Button>
      </ButtonCollection>
    ) : (
      <Button color="primary" onClick={this.initializeTable}>
        New Table
      </Button>
    );

    return (
      <FieldSet
        legend={title}
        description={description}
        isCollapsible={options.collapsible}
        isCollapsed={options.collapsed}
      >
        {table}
        {buttons}
      </FieldSet>
    );
  }
}
