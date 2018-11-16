# sanity-plugin-table

[Sanity](https://www.sanity.io/) plugin that implements a `table` schema type and input component.

## Installing

### via npm

Install using the [Sanity CLI](https://www.sanity.io/docs/cli).

```
sanity install table
```

## Usage

Simply specify `table` as a field type in your schema.

```js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    name: 'sizeChart',
    title: 'Size Chart',
    type: 'table', // Specify table type
  ],
};
```

## License

[MIT](http://opensource.org/licenses/MIT)
