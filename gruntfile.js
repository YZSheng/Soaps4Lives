var fs = require('fs');
var join = require('path').join;
module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    cwd: "./views",
                    src: "**/*.jade",
                    dest: "./views",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        jshint: {
            check: {
                src: ['gruntfile.js', 'app.js', 'db.js', 'email.js', 'routes/*.js'],
                options: {
                    jshintrc: true,
                    smarttabs: true
                }
            }
        },
        watch: {
            jade: {
                files: ['./views/**'],
                tasks: ['jade'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['gruntfile.js', 'app.js', 'db.js', 'email.js', 'routes/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jade', 'jshint']);
};