import { definePlugin } from 'sanity';

import { TableComponent, TablePreview } from './components';

interface TableOptions {
  rowType?: string;
}

export default definePlugin<TableOptions>(function ({ rowType }) {
  return {
    name: 'table',
    schema: {
      types: [
        {
          title: 'Table Row',
          name: 'tableRow',
          type: 'object',
          fields: [
            {
              name: 'cells',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
        {
          title: 'Table',
          name: 'table',
          type: 'object',
          fields: [
            {
              name: 'rows',
              type: 'array',
              of: [
                {
                  // TODO
                  type: 'tableRow',
                },
              ],
            },
          ],
          components: {
            input: TableComponent,
            preview: TablePreview,
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
        },
      ],
    },
  };
});
