import { uuid } from '@sanity/uuid';
import React from 'react';
import PropTypes from 'prop-types';
import config from 'config:table'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import FieldSet from 'part:@sanity/components/fieldsets/default';
import ButtonGrid from 'part:@sanity/components/buttons/button-grid';
import Button from 'part:@sanity/components/buttons/default';
import Table from './components/table';

import styles from './component.css';

const createPatchFrom = (value) => {
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
    const newValue = {
      rows: [{
        _type: config.rowType,
        _key: uuid(),
        cells: [''],
      }],
    };
    return onChange(createPatchFrom(newValue));
  };

  addRow = (e) => {
    const { value, onChange } = this.props;
    // If we have an empty table, create a new one
    if (!value) return this.initializeTable();
    // Clone the current table data
    const newValue = { ...value };
    // Calculate the column count from the first row
    const columnCount = value.rows[0].cells.length;
    // Add as many cells as we have columns
    newValue.rows.push({
      _type: config.rowType,
      _key: uuid(),
      cells: Array(columnCount).fill(''),
    });
    return onChange(createPatchFrom(newValue));
  };

  removeRow = (index) => {
    if (!window.confirm('Remove this row?')) {
      return;
    }

    const { value, onChange } = this.props;
    // Clone the current table data
    const newValue = { ...value };
    // Remove the row via index
    newValue.rows.splice(index, 1);
    // If the last row was removed, clear the table

    if (!newValue.rows.length) {
      return this.clear(true);
    }
    return onChange(createPatchFrom(newValue));
  };

  addColumn = (e) => {
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

  removeColumn = (index) => {
    if (!window.confirm('Remove this column?')) {
      return;
    }

    const { value, onChange } = this.props;
    // Clone the current table data
    const newValue = { ...value };
    // For each of the rows, remove the cell by index
    newValue.rows.forEach((row) => {
      row.cells.splice(index, 1);
    });
    // If the last cell was removed, clear the table
    if (!newValue.rows[0].cells.length) {
      return this.clear(true);
    }
    return onChange(createPatchFrom(newValue));
  };

  // Unsets the entire table value
  clear = (force = false) => {
    const { onChange } = this.props;

    if (!force && !window.confirm('Clear table contents?')) {
      return;
    }

    return onChange(PatchEvent.from(unset()));
  };

  focus = () => {};

  render() {
    const { onFocus, type, value, name } = this.props;
    const { title, description, options } = type;

    const table =
      value && value.rows && value.rows.length ? (
        <Table
          rows={value.rows}
          updateCell={this.updateCell}
          removeColumn={this.removeColumn}
          removeRow={this.removeRow}
          onFocus={onFocus}
        />
      ) : null;

    const buttons = value ? (
      <ButtonGrid>
        <Button inverted onClick={this.addRow}>
          Add Row
        </Button>
        <Button inverted onClick={this.addColumn}>
          Add Column
        </Button>
        <Button inverted color="danger" onClick={this.clear}>
          Clear
        </Button>
      </ButtonGrid>
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
        <div className={styles.container}>
          {table}
          {buttons}
        </div>
      </FieldSet>
    );
  }
}
