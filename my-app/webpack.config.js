const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appsConfig = require('./src/config/appsConfig'); // appsConfig をインポート

module.exports = {
    mode: 'development',
    entry: Object.fromEntries(appsConfig.map(app => [app.name.toLowerCase(), app.component])), // エントリポイントをappsConfig から動的に設定
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: appsConfig.map(app => new HtmlWebpackPlugin({ // プラグインをappsConfig から動的に設定
        filename: `${app.name.toLowerCase()}.html`,
        template: `./src/pages/${app.name}/index.html`,
        chunks: [app.name.toLowerCase()],
    })),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};