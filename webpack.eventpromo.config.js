const path = require('path');
const xEngine = require('@financial-times/x-engine/src/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = () => {
    return {
        entry: {
            demo: ['./main.js', './demos/init-demo.js', './demos/demo.scss']
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.css', '.scss']
        },
        output: {
            path: path.resolve(__dirname, 'dist/demo'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
            ]
        },
        plugins: [
            xEngine(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ]
    };
};

module.exports = webpackConfig;