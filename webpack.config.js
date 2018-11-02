const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

const commonOptions = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['react-hot-loader/babel'],
          }
        },
      },
    ],
  },
  resolve: {
    // Prevent duplicate copies of React from yarn linked copy
    // of react-hot-loader from distorting size comparison.
    symlinks: false,
  },
  resolveLoader: {
    symlinks: false,
  },
  stats: {
    all: false,
    assets: true,
  },
};

module.exports = [
  {
    ...commonOptions,
    output: {
      filename: 'output.js',
    },
    optimization: {
      minimize: false,
    },
  },
  {
    ...commonOptions,
    output: {
      filename: 'output.min-pretty.js',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            mangle: false,
            output: {
              beautify: true,
            },
          },
        }),
      ],
    },
  },
  {
    ...commonOptions,
    output: {
      filename: 'output.min.js',
    },
    stats: {
      ...commonOptions.stats,
      exclude: false,
      maxModules: Infinity,
      modules: true,
      optimizationBailout: true,
      providedExports: true,
      reasons: true,
      usedExports: true,
    }
  },
];
