// apps/auth/module-federation.config.js
// Import NextFederationPlugin for module federation
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'management',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          '/users': './src/pages/users/index.tsx',
          '/users/new': './src/pages/users/new-edit.tsx',
          '/users/edit': './src/pages/users/new-edit.tsx',
          '/companies': './src/pages/companies/index.tsx',
          '/companies/new': './src/pages/companies/new-edit.tsx',
          '/companies/edit': './src/pages/companies/new-edit.tsx',
          '/groups': './src/pages/groups/index.tsx',
          '/groups/new': './src/pages/groups/new-edit.tsx',
          '/groups/edit': './src/pages/groups/new-edit.tsx',
          '/activity-logs': './src/pages/logs/index.tsx',
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
