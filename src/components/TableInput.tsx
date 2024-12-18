import { RemoveIcon } from '@sanity/icons';
import { Box, Button, TextInput } from '@sanity/ui';
import type { FormEvent } from 'react';

import type { TableRow } from './TableComponent';

interface TableInputProps {
  rows: TableRow[];
  updateCell: (
    e: FormEvent<HTMLInputElement>,
    rowIndex: number,
    cellIndex: number
  ) => void;
  removeRow: (index: number) => void;
  removeColumn: (index: number) => void;
}

export const TableInput = (props: TableInputProps) => {
  const updateCell = props.updateCell;

  const renderRowCell = (rowIndex: number) =>
    function RowCell(cell: string, cellIndex: number) {
      return (
        <td key={`cell-${rowIndex}-${cellIndex}`}>
          <TextInput
            fontSize={1}
            padding={3}
            value={cell}
            onChange={e => updateCell(e, rowIndex, cellIndex)}
          />
        </td>
      );
    };

  const renderRow = (row: TableRow, rowIndex: number) => {
    const renderCell = renderRowCell(rowIndex);

    return (
      <tr key={`row-${rowIndex}`}>
        {row.cells.map(renderCell)}
        {
          <td key={rowIndex}>
            <Box marginLeft={1} style={{ textAlign: 'center' }}>
              <Button
                icon={RemoveIcon}
                padding={2}
                onClick={() => props.removeRow(rowIndex)}
                mode="bleed"
              />
            </Box>
          </td>
        }
      </tr>
    );
  };

  return (
    <table style={{ width: '100%' }}>
      <tbody>
        {props.rows.map(renderRow)}
        <tr>
          {(props.rows[0]?.cells || []).map((_, i) => (
            <td key={i}>
              <Box marginTop={1} style={{ textAlign: 'center' }}>
                <Button
                  icon={RemoveIcon}
                  padding={2}
                  onClick={() => props.removeColumn(i)}
                  mode="bleed"
                />
              </Box>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
