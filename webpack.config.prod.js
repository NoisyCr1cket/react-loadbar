
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const DIST = 'dist'

// TODO Needs consolidating -- mostly identical to dev conf
module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, DIST),
        library: 'ReactLoadBar',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { typeCheck: true }
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CheckerPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin({
            ecma: 5,
            sourceMap: false
        })
    ]
}

