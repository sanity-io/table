import config from 'config:table'
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
          type: config.rowName,
        },
      ],
    },
  ],
  inputComponent: TableInput,
};
