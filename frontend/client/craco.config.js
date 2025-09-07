const { whenProd } = require('@craco/craco');
const Critters = require('critters-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins,
          ...whenProd(
            () => [
              new Critters({
                preload: 'swap',
                preloadFonts: false
              }),
            ],
            []
          ),
        ],
      };
    },
  },
};