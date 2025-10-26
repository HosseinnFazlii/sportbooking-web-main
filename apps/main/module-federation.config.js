// apps/main/module-federation.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const Dotenv = require('dotenv-webpack');
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const dotenv = new Dotenv({
  path: `./${envFile}`
});
const { getRemoteAppsAsObject } = require("./module-federation.remotes.js");

module.exports = {
  webpack(config, options) {
    config.plugins.push(dotenv);
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mf-main', // <- For NextFederationPlugin naming conflict instead of name: 'main' we had to use anything else.
        filename: 'static/chunks/remoteEntry.js',
        remotes: getRemoteAppsAsObject(options.isServer),
        shared: {
          '@emotion/react': {
            requiredVersion: false,
            singleton: true,
          },
          '@emotion/styled': {
            requiredVersion: false,
            singleton: true,
          },
          '@mf-core/core-ui': {
            requiredVersion: false,
            singleton: true,
          },
          'react-i18next': {
            requiredVersion: false,
            singleton: true,
            eager: false,
          },
          'i18next': {
            requiredVersion: false,
            singleton: true,
            eager: false,
          }
        },
        extraOptions: {
          exposePages: true
        }
      }),
    );
    return config;
  },
};
