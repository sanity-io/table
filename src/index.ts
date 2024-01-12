import { definePlugin, defineType } from 'sanity';

import { TableComponent, TablePreview } from './components';
export type {
  TableValue,
  TableProps,
  TableRow,
} from './components/TableComponent';

export { TableComponent, TablePreview };

export interface TableConfig {
  rowType?: string;
}

export const table = definePlugin<TableConfig | undefined>(config => {
  const tableRowSchema = defineType({
    title: 'Table Row',
    name: config?.rowType || 'tableRow',
    type: 'object',
    fields: [
      {
        name: 'cells',
        type: 'array',
        of: [{ type: 'string' }],
      },
    ],
  });

  const tableSchema = defineType({
    title: 'Table',
    name: 'table',
    type: 'object',
    fields: [
      {
        name: 'rows',
        type: 'array',
        of: [
          {
            type: tableRowSchema.name,
          },
        ],
      },
    ],
    components: {
      //TODO remove as any when rc.3 is released
      input: TableComponent as any,
      preview: TablePreview as any,
    },
    preview: {
      select: {
        rows: 'rows',
        title: 'title',
      },
      prepare: ({ title, rows = [] }) => ({
        title,
        rows,
      }),
    },
  });

  return {
    name: 'table',
    schema: {
      types: [tableRowSchema, tableSchema],
    },
  };
});
