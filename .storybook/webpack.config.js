// https://storybook.js.org/configurations/custom-webpack-config/
// load the default config generator
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const reactScriptsTsConfig = require('@baristalabs/react-scripts-ts/config/webpack.config.dev')
const autoprefixer = require('autoprefixer')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)

  // (Extend as needed)

  // TypeScript
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  })

  // SCSS, copied from react-scripts-ts
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: require.resolve('sass-loader')
      }
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx', '.scss')
  return config
}