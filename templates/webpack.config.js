const { resolve } = require('path');

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/index.coffee']
    },
    module: {
        rules: [{
            test: /\.coffee$/,
            loader: 'coffee-loader'
        }, {
            test: /\.js$/,
            exclude: [/\.(min|umd)\.js$/],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            }
        }]
    },
    output: {
        path: resolve(__dirname, 'build', '<%= dizmoName %>'),
        filename: 'index.js'
    },
    mode: 'none'
};
