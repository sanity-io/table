# Sanity Table Plugin

This is a (double) fork of the Sanity Plugin Table, migrated to [Sanity Studio V3](https://beta.sanity.io/docs/platform/studio/v2-to-v3).

> Forked form [rdunk/sanity-plugin-table](https://github.com/rdunk/sanity-plugin-table).
> Forked form [MathisBullinger/sanity-plugin-another-table](https://github.com/MathisBullinger/sanity-plugin-another-table).

![example](https://user-images.githubusercontent.com/8467307/48703530-e369be00-ebeb-11e8-8299-14812461aee8.gif)

## Install

Install using npm

```bash
$ npm i sanity-plugin-table@v3
```

## Usage

Add the plugin to your project configuration. Then use the type in your schemas

```js
// sanity.config.ts

import { defineConfig } from 'sanity';

import { table } from 'sanity-plugin-table';

export default defineConfig({
  name: 'default',
  title: 'My Cool Project',
  projectId: 'my-project-id',
  dataset: 'production',
  plugins: [
    // Include the table plugin
    table(),
  ],
  schema: {
    types: [
      {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
          {
            // Include the table as a field
            // Giving it a semantic title
            name: 'sizeChart',
            title: 'Size Chart',
            type: 'table',
          },
        ],
      },
    ],
  },
});
```

## Development

The project can be built using `npm run build`.

To test the plugin in a Sanity project, run `npm run link-watch`, then `sanity-plugin-table` can be tested inside the Sanity Studio. Follow the [directions in plugin-kit](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio) for more details.
