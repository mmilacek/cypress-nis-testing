const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.json'
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: './tsconfig.json',
      silent: true,
    }),
  ],

  node: {
    fs: 'empty'
  }  
};

