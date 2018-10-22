const path = require('path');
const xEngine = require('@financial-times/x-engine/src/webpack');

const webpackConfig = (env) => {
    const commonConfig = {
        entry: {
            main: './src/index.js',
            styles: './node_modules/@financial-times/x-eventpromo/dist/Eventpromo.css'
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
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
                    test: /\.(css)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'n-magnet.css',
                                outputPath: 'css/'
                            }
                        },
                    ]
                },
            ]
        },
        plugins: [
            xEngine()
        ]
    };

    const devConfig = {
        entry: {
            ...commonConfig.entry,
            ...{demo: './demos/src/demo.js'}
        }
    };

    const prodConfig = {
        externals: {
            'o-date': 'oDate',
            '@financial-times/x-engine': 'xEngine'
        }
    };

    if (env === 'production') {
        return {...commonConfig, ...prodConfig};
    }
    return {...commonConfig, ...devConfig};
};

module.exports = webpackConfig;