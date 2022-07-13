import React, { FunctionComponent } from 'react';
import type { TableRow } from '../TableComponent';
import styles from './table.css';

const TablePreview: FunctionComponent<{ rows: TableRow[] }> = props => {
  return (
    <table className={styles.tablePreview}>
      <tbody>
        {props.rows.map((row, i) => (
          <tr key={row._key}>
            {row.cells.map((cell, j) => (
              <td key={`${row._key}-${j}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePreview;
