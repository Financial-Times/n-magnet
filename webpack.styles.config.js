const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfigStyles = () => {
    return {
        entry: {
            demo: ['./demos/demo.scss']
        },
        resolve: {
            alias: {
                'mathsass/dist/math': path.resolve(__dirname, 'bower_components/mathsass/dist/_math'),
                'sass-mq/mq': path.resolve(__dirname, 'bower_components/sass-mq/_mq'),
            },
            modules: [
                'bower_components',
            ],
            extensions: ['.jsx', '.css', '.scss']
        },
        output: {
            path: path.resolve(__dirname, 'dist/demo/styles'),
        },
        module: {
            rules: [
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
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ]
    };
};

module.exports = webpackConfigStyles;