var gulp = require("gulp");

var babel = require("gulp-babel");

// gulp 中插件的应用   下载插件  --》 取到插件  --》 应用插件

// 压缩html
var htmlClean = require("gulp-htmlclean")


// 压缩图片插件
var imagemin = require("gulp-imagemin");

// 压缩js插件
var uglify = require("gulp-uglify");

// 去掉js中的调试语句
const stripDebug = require('gulp-strip-debug');

//将less转换成css
var less = require('gulp-less');

// 压缩css
let cleanCSS = require('gulp-clean-css');

// 添加css前缀
const autoprefixer = require('autoprefixer');
const postCSS = require('gulp-postcss');

// 开启本地服务器
var connect = require("gulp-connect");



var folder = { // 设置路径文件，避免开发目录或者生产目录文件名字发生变化的时候大量更改名称
    src: "src/",
    dist: "dist/"
}


// 判断环境变量
var devMod = process.env.NODE_ENV == "development";
// 先运行export NODE_ENV=development 将环境设置为开发环境 注意等号左右不能有空格，否则会报错
// 发布上线之前 再次运行export NODE_ENV=production 将环境设置为发布环境，则执行下列任务的时候运行相应的压缩等条件
console.log(devMod);


gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
    if (!devMod) { // 判断是生产环境还是开发环境，以决定是否执行压缩语句
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("css", function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCSS([autoprefixer()])) //添加前缀，， 将autoprefixer作为参数传给postCSS
    if (!devMod) {
        page.pipe(cleanCSS({
            compatibility: 'ie8'
        }))
    }
    page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("image", function () {
    gulp.src(folder.src + "image/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload()) // 添加自动刷新事件
        .pipe(babel())
    if (!devMod) {
        page.pipe(stripDebug())
            .pipe(uglify())         

    }
    page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task('connect', function () {
    connect.server({
        port: "8082",
        livereload: true
    });
})

// 监听文件变化，
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]); // 监听html文件夹下的所有文件，如果发生变化则执行 ["html"]事件
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "css/*", ["css"]);
})

gulp.task("default", ["html", "css", "js", "image", "connect", "watch"]) // 把所有的任务放到默认事件中执行