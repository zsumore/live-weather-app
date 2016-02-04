var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
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
        loaders: [{
            test: /\.js$/,
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
