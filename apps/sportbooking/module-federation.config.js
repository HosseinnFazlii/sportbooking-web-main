// apps/auth/module-federation.config.js
// Import NextFederationPlugin for module federation
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'sportbooking',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          '/dashboard': './src/pages/dashboard/index.tsx',
          '/bookings': './src/pages/bookings/index.tsx',
          '/bookings/new': './src/pages/bookings/new-edit.tsx',
          '/bookings/view': './src/pages/bookings/new-edit.tsx',
          '/templates': './src/pages/templates/index.tsx',
          '/templates/new': './src/pages/templates/new-edit.tsx',
          '/templates/edit': './src/pages/templates/new-edit.tsx',
          '/reports/finance': './src/pages/reports/finance/index.tsx',
          '/reports/bookings': './src/pages/reports/bookings/index.tsx',
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
        }
      }),
    );
    return config;
  },
};
