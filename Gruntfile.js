//HOW TO USE THIS
// INSTALL NODE.JS
// run npm install grunt-cli
// ENTER GRUNT COMMANDS
// ADD NEW PLUGINS VIA
// npm install grunt-x --save-dev
//GRUNTFILE COMMANDS
// grunt help //list commands
// grunt monitor //live analysis of jslint
// grunt concatCSS //concatenate css and minify
// grunt concatLibraries //concatenate all extension files
// grunt concatComplete //concatenate all js files
// grunt compile //concatenate all js and css files, then minify them

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        // Eval code live
        watch: {
            js: {
                files: ['src/scripts/*.js','Gruntfile.js'],
                tasks: ['jsbeautifier:JS','jshint']
            }
        },
        // Eval code
        jshint: {
            options: {
                'node': true,
                'curly': true,
                'eqnull': true,
                'undef': true,
                'unused': true,
                'trailing': true,
                'indent': 4,
                'newcap': true,
                'camelcase': true,
                'browser': true,
                'noempty': true,
                'nonbsp': true,
                'quotmark': true,
                'bitwise': false,
                'globals': {
                    'jQuery': true,
                    '$': true,
                    'L': true //Leaflet global
                }
            },
            all: ['Gruntfile.js', 'src/scripts/*.js']
        },
        // Concat files
        concat: {
            main: {
                options: {
                    banner:'/*\n' +
                        '  * <%= pkg.name %> v<%= pkg.version %>\n' +
                        '  * \u00A9 Copyright <%= pkg.author %> <%= grunt.template.today("yyyy") %>\n' +
                        '  * Built on: <%= grunt.template.today("mm-dd-yyyy") %>\n'+
                        ' */\n\n'
                },
                src: ['src/scripts/*.js'],
                dest: 'build/<%=  pkg.name %>.<%= pkg.version %>.js'
            }
        },
        // Format styling
        jsbeautifier : {
            JS: {
                src : ['src/scripts/*.js','!src/scrips/**/*.js'],
            }
        },
        // Minify
        uglify: {
            minify: {
                options: {
                    compress: true,
                    mangle: true,
                    banner:'/*\n' +
                        '  * <%= pkg.name %> v<%= pkg.version %>\n' +
                        '  * \u00A9 Copyright <%= pkg.author %> <%= grunt.template.today("yyyy") %>\n' +
                        '  * Built on: <%= grunt.template.today("mm-dd-yyyy") %>\n'+
                        ' */\n\n'
                },
                files: {
                    'build/<%=  pkg.name %>.<%= pkg.version %>.min.js': ['build/<%=  pkg.name %>.<%= pkg.version %>.js'],
                }
            }
        }

    });

    // Load the Grunt plugins matching grunt-*.
    require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

    // Register the tasks
    grunt.loadTasks('grunt/tasks');

};