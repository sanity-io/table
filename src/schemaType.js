import TableInput from './component';

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
          name: 'row',
          type: 'object',
          fields: [
            {
              name: 'cells',
              type: 'array',
              of: [{ name: 'cell', type: 'string' }],
            },
          ],
        },
      ],
    },
  ],
  inputComponent: TableInput,
};
