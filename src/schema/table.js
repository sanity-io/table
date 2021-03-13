import TableInput from '../component';

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
          type: 'tableRow',
        },
      ],
    },
  ],
  inputComponent: TableInput,
};
