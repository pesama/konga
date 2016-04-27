/**
 * Created by sm on 26/04/16.
 */

'use strict';

var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = function makeWebpackConfig( options ) {
    /**
     * Environment type
     * PRO is for generating minified builds
     */
    var PRO = !!options.PRO;

    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {
        devtool : PRO ? 'eval' : 'source-map',
        entry : {
            app : './index.js'
        },
        // eslint : {
        //     configFile : './test/.eslintrc'
        // },
        output : {
            // Absolute output directory
            path : __dirname + '/dist',

            // Filename for entry points
            // Only adds hash in build mode
            filename : PRO ? '[name].[hash].js' : '[name].bundle.js',

            // Filename for non-entry points
            // Only adds hash in build mode
            chunkFilename : PRO ? '[name].[hash].js' : '[name].bundle.js'
        }
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        // preLoaders : [
        //     {
        //         test : /\.js$/,
        //         loader : "eslint-loader",
        //         exclude : [ /node_modules/ ]
        //     }
        // ],
        loaders : [
            {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                // JS LOADER
                // Reference: https://github.com/babel/babel-loader
                // Transpile .js files using babel-loader
                // Compiles ES6 and ES7 into ES5 code
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : /node_modules/,
                query : {
                    presets : [ 'es2015' ],
                    cacheDirectory : true,
                    plugins : [ 'transform-runtime' ]
                }
            },
            // {
            //     test : /\.json$/,
            //     loader : 'json-loader'
            // },
            {
                //IMAGE LOADER
                test : /\.(jpe?g|png|gif|svg)$/i,
                loaders : [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test : /\.(ico)$/,
                loader : 'static-loader'
            },
            {
                test : /\.html$/,
                loader : 'ngtemplate!html'
            }
        ]
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin( '[name].[hash].css', {
            disable : !PRO
        } ),

        // // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // // Render index.html
        // new HtmlWebpackPlugin( {
        //     favicon : './favicon.ico',
        //     filename : './index.html',
        //     template : './app/index.html',
        //     inject : 'body'
        // } ),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin()
    ];

    // Add PRO specific plugins
    if ( PRO ) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin()
        )
    }

    return config;
}({ PRO: false });