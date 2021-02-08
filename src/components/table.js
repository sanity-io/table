import React from 'react';
import PropTypes from 'prop-types';

import styles from './table.css';

const Table = ({ onFocus, rows, updateCell, removeColumn, removeRow }) => {
  if (!rows || !rows.length) return null;

  // Button to remove row
  const renderRowRemover = (index) => (
    <td className={styles.rowDelete}>
      <span onClick={() => removeRow(index)} />
    </td>
  );

  // Button to remove column
  const renderColumnRemover = (index) => (
    <td key={index} className={styles.colDelete}>
      <span onClick={() => removeColumn(index)} />
    </td>
  );

  const renderColumnRemovers = (row) => (
    <tr>{row.cells.map((c, i) => renderColumnRemover(i))}</tr>
  );

  const renderRowCell = (rowIndex) => (cell, cellIndex) => (
    <td key={`cell-${cellIndex}`} className={styles.cell}>
      <input
        className={styles.input}
        type="text"
        value={cell}
        onChange={(e) => updateCell(e, rowIndex, cellIndex)}
        onFocus={() => onFocus([rowIndex, cellIndex])}
      />
    </td>
  );

  const renderRow = (row, rowIndex) => {
    const renderCell = renderRowCell(rowIndex);
    return (
      <tr key={`row-${rowIndex}`}>
        {row.cells.map(renderCell)}
        {renderRowRemover(rowIndex)}
      </tr>
    );
  };

  return (
    <table className={styles.table}>
      <tbody>
        {rows.map(renderRow)}
        {renderColumnRemovers(rows[0])}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  rows: PropTypes.array,
  updateCell: PropTypes.func,
  removeColumn: PropTypes.func,
  removeRow: PropTypes.func,
};

export default Table;
