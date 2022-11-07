const { showIncompatiblePluginDialog } = require('@sanity/incompatible-plugin');
const { name, version } = require('./package.json');

export default showIncompatiblePluginDialog({
  name: name,
  versions: {
    v3: version,
    // Optional: If there is not v2 version of your plugin, v2 can be omitted
    v2: '^2.3.0',
  },
  // Optional: Feel free to put this as field in package.json and import it alongside name and version above
  // sanityExchangeUrl: 'https://www.sanity.io/plugins/<plugin-on-sanity-exchanged>',
});
