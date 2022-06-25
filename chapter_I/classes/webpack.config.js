const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebplackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevEnv = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        isDevEnv && new ReactRefreshWebplackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
    ].filter(Boolean),
    devServer: {
        static: path.resolve(__dirname, 'public'),
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevEnv && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            }, 
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    mode: isDevEnv ? 'development' : 'production',

}