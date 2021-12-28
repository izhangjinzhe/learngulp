const {
  src,
  dest,
  series,
  watch
} = require( 'gulp' )
const plugins = require( 'gulp-load-plugins' )()
var sass = require( 'gulp-sass' )( require( 'node-sass' ) );
const browserSync = require( 'browser-sync' )
const reload = browserSync.reload

const del = require( 'del' )

// 压缩js uglifyjs
function js( cb ) {
  src( 'src/*.js' )
    .pipe( plugins.uglify() )
    .pipe( dest( './dist' ) )
    .pipe( reload( { stream: true } ) )
  cb()
}

// 对scss/less编译，压缩，输出css文件
function css( cb ) {
  src( 'src/*.scss' )
    .pipe( sass( { outputStyle: 'compressed' } ) )
    .pipe( plugins.autoprefixer( {
      cascade: false,
      remove: false
    } ) )
    .pipe( dest( './dist' ) )
    .pipe( reload( { stream: true } ) )
  cb()
}

// 监听这些文件的变化
function watcher() {
  watch( 'src/*.js', js )
  watch( 'src/*.scss', css )
}

// 删除dist目录中的内容
function clean( cb ) {
  del( './dist' )
  cb()
}

function server( cb ) {
  browserSync.init( {
    server: {
      baseDir: './'
    }
  } )
  cb()
}

exports.scripts = js //导出,可单独调用 npx gulp script
exports.styles = css
exports.clean = clean
exports.default = series( [ clean, js, css, server, watcher ] ) // gulp默认调用
