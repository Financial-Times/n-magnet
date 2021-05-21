'use strict';

const xEngine = require('@financial-times/x-engine/src/webpack');
const path = require('path');

const {PageKitBasePlugin} = require('@financial-times/dotcom-build-base');
const {PageKitJsPlugin} = require('@financial-times/dotcom-build-js');
const {PageKitSassPlugin} = require('@financial-times/dotcom-build-sass');
const {PageKitBowerResolvePlugin} = require('@financial-times/dotcom-build-bower-resolve');

let plugins = [
    new PageKitBasePlugin(),
    new PageKitJsPlugin(),
    new PageKitSassPlugin({prependData: '$o-grid-mode: \'snappy\';'}),
    new PageKitBowerResolvePlugin(),
    xEngine()
];

module.exports = {
    entry: {
        scripts: path.resolve(__dirname, './init-demo.js'),
        styles: path.resolve(__dirname, './demo.scss')
    },
    plugins,
    module: {
        rules: [
            // load .html files as handlebars.
            // required for some n- component templates
            {
                test: /\.html$/,
                loader: 'handlebars-loader',
                options: {
                    extensions: ['.html'],
                    helperDirs: [
                        path.join(require.resolve('@financial-times/dotcom-server-handlebars'), '../helpers')
                    ],
                    partialDirs: [
                        path.resolve('node_modules/@financial-times/'),
                        path.resolve('bower_components/')
                    ]
                },
            }
        ]
    }
};
