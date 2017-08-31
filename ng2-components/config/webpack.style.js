const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractScss = new ExtractTextPlugin('./ng2-alfresco-core/prebuilt-themes/[name].css');

module.exports = {

    entry: {
        'adf-blue-orange': './ng2-alfresco-core/styles/prebuilt/adf-blue-orange.scss',
        // 'adf-blue-purple': './ng2-alfresco-core/styles/prebuilt/adf-blue-purple.scss',
        // 'adf-cyan-orange': './ng2-alfresco-core/styles/prebuilt/adf-cyan-orange.scss',
        // 'adf-cyan-purple': './ng2-alfresco-core/styles/prebuilt/adf-cyan-purple.scss',
        // 'adf-green-purple': './ng2-alfresco-core/styles/prebuilt/adf-green-purple.scss',
        // 'adf-green-orange': './ng2-alfresco-core/styles/prebuilt/adf-green-orange.scss',
        // 'adf-pink-bluegrey': './ng2-alfresco-core/styles/prebuilt/adf-pink-bluegrey.scss',
        // 'adf-indigo-pink': './ng2-alfresco-core/styles/prebuilt/adf-indigo-pink.scss',
        // 'adf-purple-green': './ng2-alfresco-core/styles/prebuilt/adf-purple-green.scss'
    },

    output: {
        filename: './dist/[name].js'
    },

    resolve: {
        alias: {
            "ng2-alfresco-core": path.resolve(__dirname, '../ng2-alfresco-core'),
            "ng2-alfresco-datatable": path.resolve(__dirname, '../ng2-alfresco-datatable'),
            "ng2-activiti-diagrams": path.resolve(__dirname, '../ng2-activiti-diagrams'),
            "ng2-activiti-analytics": path.resolve(__dirname, '../ng2-activiti-analytics'),
            "ng2-activiti-form": path.resolve(__dirname, '../ng2-activiti-form'),
            "ng2-activiti-tasklist": path.resolve(__dirname, '../ng2-activiti-tasklist'),
            "ng2-activiti-processlist": path.resolve(__dirname, '../ng2-activiti-processlist'),
            "ng2-alfresco-documentlist": path.resolve(__dirname, '../ng2-alfresco-documentlist'),
            "ng2-alfresco-login": path.resolve(__dirname, '../ng2-alfresco-login'),
            "ng2-alfresco-search": path.resolve(__dirname, '../ng2-alfresco-search'),
            "ng2-alfresco-social": path.resolve(__dirname, '../ng2-alfresco-social'),
            "ng2-alfresco-tag": path.resolve(__dirname, '../ng2-alfresco-tag'),
            "ng2-alfresco-upload": path.resolve(__dirname, '../ng2-alfresco-upload'),
            "ng2-alfresco-viewer": path.resolve(__dirname, '../ng2-alfresco-viewer'),
            "ng2-alfresco-webscript": path.resolve(__dirname, '../ng2-alfresco-webscript'),
            "ng2-alfresco-userinfo": path.resolve(__dirname, '../ng2-alfresco-userinfo'),
        }
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: extractScss.extract([{
                loader: "raw-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: [path.resolve(__dirname, '../../ng2-components/ng2-alfresco-core/styles')]
                }
            }])
        }]
    },
    plugins: [
        extractScss
    ]
};
