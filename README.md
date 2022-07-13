# Another Sanity Table Plugin

> Forked form [rdunk/sanity-plugin-table](https://github.com/rdunk/sanity-plugin-table).

## Usage

Simply specify `table` as a field type in your schema.

```js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'sizeChart',
      title: 'Size Chart',
      type: 'table', // Specify 'table' type
    },
  ],
};
```
