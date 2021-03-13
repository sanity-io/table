# sanity-plugin-table

[Sanity](https://www.sanity.io/) plugin that implements a `table` schema type and input component.

![example](https://user-images.githubusercontent.com/8467307/48703530-e369be00-ebeb-11e8-8299-14812461aee8.gif)

## Installing

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
    {
      name: 'sizeChart',
      title: 'Size Chart',
      type: 'table', // Specify table type
    }
  ],
};
```

## Similar Packages
* [sanity-datatable](https://github.com/fredjens/sanity-datatable/) by [fredjens](https://github.com/fredjens/)

## License

[MIT](http://opensource.org/licenses/MIT)
