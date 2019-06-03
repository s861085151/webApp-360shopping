const { src, dest, series, parallel } = require('gulp')

const path = require('path')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

const webpackStream = require('webpack-stream')
const gulpSass = require('gulp-sass')

//复制html文件
function copyHTML() {
    return src('./*.html')
        .pipe(dest('./dist'))
}

//复制libs
function copyLibs() {
    return src('./src/libs/**/*')
        .pipe(dest('./dist/libs'))
}

//复制图片
function copyIMG() {
    return src('./src/images/**/*')
        .pipe(dest('./dist/images'))
}

//复制icon
function copyIcon() {
    return src('./src/iconfont/**/*')
        .pipe(dest('./dist/iconfont'))
}


//编译JS文件
function packJS() {
    return src('./src/**/*')
        .pipe(webpackStream({
            mode: 'production',
            entry: {
                app: './src/app.js'
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, './dist')
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
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    },
                    {
                        test: /\.art$/,
                        loader: 'string-loader'
                    }
                ]
            }
        }))
        .pipe(rev())
        .pipe(dest('./dist/scripts'))
        .pipe(rev.manifest())
        .pipe(dest('./rev/scripts'))
}

function revColl() {
    return src(['./rev/**/*.json', './dist/*.html'])
    .pipe(revCollector())
    .pipe(dest('./dist'))
}

//编译CSS
function packCSS() {
    return src('./src/styles/app.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(rev())
        .pipe(dest('./dist/styles'))
        .pipe(rev.manifest())
        .pipe(dest('./rev/styles'))
}

exports.default = series( parallel(packCSS, packJS, copyLibs, copyIMG, copyIcon), copyHTML, revColl )