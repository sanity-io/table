import config from 'config:table'

export default {
  title: 'Table Row',
  name: config.rowName,
  type: 'object',
  fields: [
    {
      name: 'cells',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
