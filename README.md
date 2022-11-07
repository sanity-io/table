# Sanity Table Plugin

This is a (double) fork of the Sanity Plugin Table, migrated to [Sanity Studio V3](https://beta.sanity.io/docs/platform/studio/v2-to-v3).

> Forked form [rdunk/sanity-plugin-table](https://github.com/rdunk/sanity-plugin-table).
> Forked form [MathisBullinger/sanity-plugin-another-table](https://github.com/MathisBullinger/sanity-plugin-another-table).

![example](https://user-images.githubusercontent.com/8467307/48703530-e369be00-ebeb-11e8-8299-14812461aee8.gif)

## Install

Install using the [Sanity CLI](https://www.sanity.io/docs/cli).

```bash
$ npm i sanity-plugin-another-table
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
      type: 'table',
    },
  ],
};
```
