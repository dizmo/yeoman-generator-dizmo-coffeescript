'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const rimraf = require('rimraf');

module.exports = class extends Generator {
    writing() {
        const upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json')
        );
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('gulp/'),
                this.destinationPath('gulp/')
            );
        }
        if (!upgrade || upgrade) {
            const pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            delete pkg.devDependencies['babel-loader'];
            delete pkg.devDependencies['webpack'];
            delete pkg.devDependencies['webpack-stream'];
            delete pkg.optionalDependencies['webpack-obfuscator'];
            delete pkg.optionalDependencies['terser-webpack-plugin'];
            this.fs.writeJSON(
                this.destinationPath('package.json'), pkg, null, 2
            );
        }
        if (!upgrade || upgrade) {
            const pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'babelify': '^10.0.0',
                    'browserify': '^16.5.0',
                    'gulp-uglify': '^3.0.2',
                    'vinyl-buffer': '^1.0.1',
                    'vinyl-source-stream': '^2.0.0',
                    'watchify': '^3.11.1'
                })
            );
            pkg.optionalDependencies = sort(
                lodash.assign(pkg.optionalDependencies, {
                    'javascript-obfuscator': '^0.18.1'
                })
            );
            this.fs.writeJSON(
                this.destinationPath('package.json'), pkg, null, 2
            );
        }
        if (!upgrade || upgrade) {
            const pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'coffeeify': '^3.0.1',
                    'coffeescript': '^2.4.1',
                    'gulp-coffeelint': '^0.6.0'
                })
            );
            delete pkg.devDependencies['gulp-eslint'];
            this.fs.writeJSON(
                this.destinationPath('package.json'), pkg, null, 2
            );
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('babel.config.js'),
                this.destinationPath('babel.config.js')
            );
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('src/'),
                this.destinationPath('src/')
            );
            this.fs.copy(
                this.templatePath('coffeelint.json'),
                this.destinationPath('coffeelint.json')
            );
        }
        this.conflicter.force = this.options.force || upgrade;
    }
    end() {
        rimraf.sync(
            this.destinationPath('.eslintrc.json')
        );
        rimraf.sync(
            this.destinationPath('src/index.js')
        );
        rimraf.sync(
            this.destinationPath('webpack.config.js')
        );
    }
};
function sort(object) {
    return Object.entries(object).sort().reduce(
        (a, [k, v]) => { a[k] = v; return a; }, {}
    );
}
