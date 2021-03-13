export default {
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
};
