var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/app/app.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                },
                include: path.join(__dirname, 'src/app/')
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src/app/')
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
