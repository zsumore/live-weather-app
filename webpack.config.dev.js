var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './src/index.jsx',
        './src/main.css',
        './src/index.html'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        preLoaders: [
            //Eslint loader
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
        ],
        loaders: [{
            test: /\.jsx?/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.html$/,
            loader: "file?name=[name].[ext]"
        }, {
            test: /\.css$/,
            loader: "file?name=[name].[ext]"
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    eslint: {
        configFile: './.eslintrc'
    }
};
