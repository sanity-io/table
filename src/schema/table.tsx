import React from 'react';
import config from 'config:table';
import { DatabaseIcon } from '@sanity/icons';
import TableComponent from '../TableComponent';
import TablePreview from '../components/TablePreview';

export default {
  title: 'Table',
  name: 'table',
  type: 'object',
  fields: [
    {
      name: 'rows',
      type: 'array',
      of: [
        {
          type: config.rowType,
        },
      ],
    },
  ],
  inputComponent: TableComponent,
  preview: {
    select: {
      rows: 'rows',
    },
    prepare({ rows }) {
      return {
        title: 'Table',
        media: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
          </svg>
        ),
        extendedPreview: <TablePreview rows={rows || []} />,
      };
    },
  },
};
