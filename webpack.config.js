const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './public';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        entry: './src/main.js',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: isDevBuild
            ? [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin([{ from: 'demo/' }])]
            : [],
        optimization: {
          minimizer: (!isDevBuild && [new UglifyJsPlugin()]),
        },
        module: {
            rules: [
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader',] },
                {
                    test: /\.js$/i, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/env', {
                                'targets': {
                                    'browsers': ['ie 8', 'safari 7']
                                }
                            }]]
                        }
                    }
                }
            ]
        }
    }];
};