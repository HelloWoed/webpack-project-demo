const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode:'development',
    // entry:['babel-polyfill','./main.js'],//可以有多个入口文件
    entry:{
        babelPolyfill:'babel-polyfill',//添加了这个东西，才能完美的将ES6转码,否则Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，如：Set Map
        app:'./main.js',//可以有多个入口文件
    },
    output:{
        path:path.resolve(__dirname,"dist"),//输出文件路径    path:path.join(__dirname,"dist","js")
        filename:"./js/[name].bundle.js",//"[name].[chunckhash].bundle.js"    输出的文件名称
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    //在webpack4之前，提取公共代码都是通过一个叫CommonsChunkPlugin的插件来办到的。到了webpack4以后，内置了一个一模一样的功能，就是所谓的“优化”
//    optimization: {  // 提取公共代码
//         splitChunks: {
//             cacheGroups: {
//                 vendor: {   // 剥离第三方插件
//                     test: /node_modules/,   // 指定是node_modules下的第三方包
//                     chunks: 'initial',
//                     name: 'vendor',  // 打包后的文件名，随意命名    
//                     priority: 10    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
//                 },
//                 utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
//                     chunks: 'initial',
//                     name: 'utils',  // 任意命名
//                     minSize: 0    // 只要超出0字节就生成一个新包
//                 }
//             }
//         }
//     },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
        // 提供资源文件名的断言函数
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,//有变化了处理，没有变化则不处理
                // include:[resolve('src'), resolve('test')],//需要处理的文件夹
                loader:"babel-loader"
            },
            {
                test:/\.css$/,
                // loader:"style-loader!css-loader",
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use:[
                        {loader:'css-loader',options:{importLoaders:1}},
                        'postcss-loader', 
                    ],
                    publicPath: './css'       
                })
                // use: [ //以行内样式style的标签写进打包后的html页面中
                //     {
                //         loader: "style-loader"
                //     }, 
                //     {
                //         loader: "css-loader",
                //         options: {
                //             modules: true, // 指定启用css modules
                //             localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                //         }
                //     },
                //     {
                //         loader: "postcss-loader"
                //     }
                // ]
            },
            {
                test:/\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {loader:'css-loader',options:{importLoaders:1}},
                         'postcss-loader', 
                         'less-loader'
                    ],
                    publicPath: './css'   
                  }),
                  exclude: path.resolve(__dirname,'./node_modules')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: "[name].[hash:5].[ext]",
                  outputPath: "./images",//打包后图片文件输出路径
                  publicPath:'../images'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            { //页面中经常会用到img标签，img引用的图片地址也需要一个loader来处理,这样再打包后的html文件下img就可以正常引用图片路径了
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins:[
        // 打包前先清空
        new CleanWebpackPlugin('dist/*.*') ,
        new ExtractTextWebpackPlugin({ //样式文件单独打包
            filename: "./css/app.css",  //指定生成的文件名称
            disable: false,  //是否禁用此插件
            allChunks: true
          }),
        new HtmlWebpackPlugin({
            template:"./index.html",//本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；
            filename: './index.html',//输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）
            title: 'Webpack App',//生成的html文档的标题
            chunks:["app"],
            inject:true,//1、true或者body：所有JavaScript资源插入到body元素的底部2、head: 所有JavaScript资源插入到head元素中3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
            showErrors:true,//是否将错误信息输出到html页面中
            hash:true,//是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
            minify: false,//传递 html-minifier 选项给 minify 输出
            favicon: "",//添加特定的 favicon 路径到输出的 HTML 文件中。
        }),
    ],
    devServer: {
        publicPath: '/',//
        contentBase: path.resolve(__dirname, 'dist'),//此处的路径必须和输出output文件的路径一致 否则无法自动更新，或者是基于output的相对路径
        compress: true,
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        // grogress: true,
        host: 'localhost',// 默认是localhost
        port: 9000,//指定用于侦听请求的端口号
        open:true,//当open启用时，开发服务器将打开浏览器。
        //hot: true,// 开启热更新，开启热加载还需在主入口js文件中配置
        // openPage:'index.html',//指定在打开浏览器时导航到的页面。
        overlay: {//当存在编译器错误或警告时，在浏览器中显示全屏覆盖,显示警告和错误：
            warnings: true,
            errors: true
        },
        proxy: {//代理配置
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''},//如果不想/api传递，我们需要重写路径
            }
        },
        
    }
}
