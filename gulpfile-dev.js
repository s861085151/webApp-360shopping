const { src, dest, series, parallel, watch } = require('gulp')

const path = require('path')
const webserver = require('gulp-webserver')
const webpackStream = require('webpack-stream')
const gulpSass = require('gulp-sass')
const proxy = require('http-proxy-middleware')
const del = require('del')

//复制html文件
function copyHTML() {
    return src('./*.html')
        .pipe(dest('./dev'))
}

//复制libs
function copyLibs() {
    return src('./src/libs/**/*')
        .pipe(dest('./dev/libs'))
}

//复制图片
function copyIMG() {
    return src('./src/images/**/*')
        .pipe(dest('./dev/images'))
}

//复制icon
function copyIcon() {
    return src('./src/iconfont/**/*')
        .pipe(dest('./dev/iconfont'))
}

//启动一个server服务器
function server() {
    return src('./')
        .pipe(webserver({
            port: 8000,
            directoryListing: true,
            livereload: true,
            middleware: [
                //首页数据
                proxy('/indexApi', {
                    target: 'http://localhost:9000',
                }),
                //首页更多商品数据
                proxy('/moreApi', {
                    target: 'http://search.mall.360.cn',
                    changeOrigin: true, // 访问不同的域名，需要配置成 true
                    pathRewrite: {
                        '^/moreApi': ''
                    }
                }),
                //悬浮PIC
                proxy('/floatPic', {
                    target: 'https://mall.360.cn',
                    changeOrigin: true, // 访问不同的域名，需要配置成 true
                    pathRewrite: {
                        '^/floatPic': ''
                    }
                }),
                //目录
                proxy('/menuSide', {
                    target: 'https://mall.360.cn',
                    changeOrigin: true, // 访问不同的域名，需要配置成 true
                    pathRewrite: {
                        '^/menuSide': ''
                    }
                }),
                proxy('/menuRight', {
                    target: 'https://mall.360.cn',
                    changeOrigin: true, // 访问不同的域名，需要配置成 true
                    pathRewrite: {
                        '^/menuRight': ''
                    }
                }),
            ]
        }))
}

//编译JS文件
function packJS() {
    return src('./src/**/*')
        .pipe(webpackStream({
            mode: 'development',
            entry: {
                app: './src/app.js'
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, './dev')
            },
            //将ES6-ES8代码转成ES5
            module: {       
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: [['@babel/plugin-transform-runtime', {
                                    'helpers': false
                                }]]
                            }
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'string-loader'
                    }
                ]
            }
        }))
        .pipe(dest('./dev/scripts'))

}

//编译CSS
function packCSS() {
    return src(['./src/styles/**/*.scss','!./src/styles/yo/**/*'])
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(dest('./dev/styles'))
}

//删除
function clear(target) {
    return function() {
        return del(target)
    }
}

//watch
function watcher() {
    watch('./*.html', series(clear('./dev/*.html'), copyHTML))       //HTML
    watch('./src/libs/**/*', series(clear('./dev/libs'), copyLibs))       //Libs
    watch('./src/images/**/*', series(clear('./dev/images'), copyIMG))       //img
    watch('./src/iconfont/**/*', series(clear('./dev/iconfont'), copyIcon))       //icon
    watch('./src/styles/**/*.scss', series(clear('./dev/styles'), packCSS))       //CSS
    watch(['./src/**/*', '!src/libs/**/*', '!src/styles/**/*','!src/images/**/*', '!src/iconfont/**/*'], series(packJS))       //JS
}

exports.default = series( parallel(packCSS, packJS, copyLibs), copyHTML, server, watcher )