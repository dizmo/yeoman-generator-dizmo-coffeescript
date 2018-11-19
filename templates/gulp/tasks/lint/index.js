let pkg = require('../../package.js'),
    extend = require('xtend');
let gulp = require('gulp'),
    gulp_coffeelint = require('gulp-coffeelint');

gulp.task('lint', function (done) {
    let lint = true;
    if (pkg.dizmo && pkg.dizmo.build) {
        let cfg_lint = pkg.dizmo.build.lint;
        if (cfg_lint || cfg_lint === undefined) {
            lint = extend({}, cfg_lint);
        } else {
            lint = false;
        }
    }

    let argv = require('yargs')
        .default('lint', lint).argv;
    if (typeof argv.lint === 'string') {
        argv.lint = JSON.parse(argv.lint);
    }

    if (argv.lint || argv.lint === undefined) {
        let stream = gulp.src([
            './src/**/*.coffee', '!src/lib/**', '!build/**', '!node_modules/**'
        ]);
        if (Object.keys(argv.lint).length > 0) {
            stream = stream.pipe(gulp_coffeelint.apply(
                this, [extend({}, argv.lint)]
            ));
        } else {
            stream = stream.pipe(gulp_coffeelint.apply(
                this
            ));
        }
        stream = stream.pipe(
            gulp_coffeelint.reporter()
        );
        return stream;
    } else {
        done();
    }
});
