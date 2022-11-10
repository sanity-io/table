import { definePlugin } from 'sanity';

import { TableComponent, TablePreview } from './components';

export const table = definePlugin(() => {
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
