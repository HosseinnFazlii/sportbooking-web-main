// apps/sportbooking/next.config.js

const { composePlugins, withNx } = require('@nx/next');

const mfConfig = require('./module-federation.config');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  reactStrictMode: false,
  ...mfConfig,
};

// Only set assetPrefix in production builds
if (process.env.NODE_ENV === 'production') {
  nextConfig.assetPrefix = '/apps/sportbooking';
  nextConfig.images = {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'support.rismun.ir',
        port: '3030',
        pathname: '/api/**',
      },
    ],
  };
}

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
