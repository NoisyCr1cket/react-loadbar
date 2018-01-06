const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist'),
        library: 'ReactLoadBar',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
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
                loader: 'awesome-typescript-loader',
                options: { useBabel: true, useCache: true }
            },
            { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
            {
                test: /\.scss$/,
                use: [
                    { loader: require.resolve('style-loader') },
                    { loader: require.resolve('css-loader'), options: { importLoaders: 1 }},
                    { loader: require.resolve('sass-loader') }
                ]
            }
        ]
    },
    plugins: [new CheckerPlugin()]
}
