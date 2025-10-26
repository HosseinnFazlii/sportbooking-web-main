// apps/auth/module-federation.config.js
// Import NextFederationPlugin for module federation
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'auth',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          '/profile': './src/pages/profile/index.tsx',
          '/login': './src/pages/login/index.tsx',
        },
        remotes: {},
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
        },
      }),
    );

    return config;
  },
};
