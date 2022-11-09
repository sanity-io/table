import { definePlugin } from 'sanity';

import { TableComponent, TablePreview, TableIcon } from './components';

interface TableOptions {
  rowType: string;
}

export default definePlugin<TableOptions>(function ({ rowType }) {
  return {
    name: 'table',
    schema: {
      types: [
        {
          title: 'Table Row',
          name: rowType,
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
                  type: rowType,
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
            },
            prepare: () => ({
              title: 'Table',
              media: TableIcon
            }),
          },
        },
      ],
    },
  };
});
