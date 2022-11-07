import { definePlugin } from 'sanity';
import { table, row } from 'src/schema';

export default definePlugin({
  name: 'table',
  schema: {
    types: [table, row],
  },
  document: {},
});
