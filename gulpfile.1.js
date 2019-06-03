// const gulp = require('gulp');   //引入gulp
const { src, dest, series } = require('gulp')
const webserver = require('gulp-webserver')
const webpackStream = require('webpack-stream')
const path = require('path')
//拷贝 index.html到 dev根目录下
//任务的回调一定要有返回值，返回值全部都是异步操作
//如果不返回值，需要调用一个callback
// gulp.task('copyhtml', (cb)=>{
//     gulp.src('./index.html')
//         .pipe(gulp.dest('./dev/'))
//     cb();
// })

// //启动一个server服务器
// gulp.task('webserver', (cb)=>{
//     gulp.src('./dev')
//         .pipe(webserver({
//             port: 8000,
//             livereload: true,
//             directoryListing: true
//         }))
//     cb()
// })


//gulp 4.0 新方法
function copyHTML() {
    return src('./index.html')
        .pipe(dest('./dev'))
}

function server() {
    return src('./dev')
        .pipe(webserver({
            port: 8000,
            livereload: true,
            directoryListing: true
        }))
}

//编译js模块
function packJS() {
    return src('./src/**/*')
        .pipe(webpackStream({
            mode: 'development',        //模式  开发模式
            entry: {                    //入口
                app: './src/app.js'
            },
            output: {                   //出口
                filename: '[name].js',     //[name] 会自动读取入口的app
                path: path.resolve(__dirname, './dev')      //路径   绝对路径   __drname 获取当前路径
            }
        }))
        .pipe(dest('./dev'))
}

// gulp.task('default', gulp.series('copyhtml','server'))
//私有任务，公有任务定义。公有任务需要在exports里显式的定义
exports.server = series(server)
exports.default = series(copyHTML, packJS, server)