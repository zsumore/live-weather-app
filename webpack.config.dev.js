const path = require('path');
const webpack = require('webpack');


module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './src/app/app.jsx'
    ],
    output: {
        path: path.join(__dirname, 'src/www/static'),
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
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader'
            },
        ],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            },
            include: path.join(__dirname, 'src/app/')
        },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }, {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }, {
                test: /\.css$/,
                loader: 'file?name=[name].[ext]'
            }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    eslint: {
        configFile: './.eslintrc'
    }
};
