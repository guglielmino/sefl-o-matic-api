// Generated on 2015-05-25 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {
    var localConfig;
    try {
        localConfig = require('./server/config/local.env');
    } catch (e) {
        localConfig = {};
    }

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server',
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        protractor: 'grunt-protractor-runner',
        injector: 'grunt-asset-injector',
        buildcontrol: 'grunt-build-control',
        rsync: 'grunt-rsync',
        babel: 'grunt-babel'

    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('package.json'),

        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server/app.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server/app.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            injectJS: {
                files: [
                    'client/{app,components}/**/*.js',
                    '!client/{app,components}/**/*.spec.js',
                    '!client/{app,components}/**/*.mock.js',
                    '!client/app/app.js',
                    '!client/app/app.module.js'],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: [
                    'client/{app,components}/**/*.css'
                ],
                tasks: ['injector:css']
            },
            mochaTest: {
                files: ['server/**/*.spec.js'],
                tasks: ['env:test', 'mochaTest']
            },
            injectSass: {
                files: [
                    'client/{app,components}/**/*.{scss,sass}'],
                tasks: ['injector:sass']
            },
            sass: {
                files: [
                    'client/{app,components}/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{.tmp,client/{app,components}/**/*.css',
                    '{.tmp,client/{app,components}/**/*.html',
                    '{.tmp,client/{app,components}/**/*.js',
                    '!{.tmp,client}{app,components}/**/*.spec.js',
                    '!{.tmp,client}/{app,components}/**/*.mock.js',
                    'client/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    'server/**/*.{js,json}'
                ],
                tasks: ['express:dev', 'wait'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: 'client/.jshintrc',
                reporter: require('jshint-stylish')
            },
            server: {
                options: {
                    jshintrc: 'server/.jshintrc'
                },
                src: [
                    'server/**/*.js',
                    '!server/**/*.spec.js'
                ]
            },
            serverTest: {
                options: {
                    jshintrc: 'server/.jshintrc-spec'
                },
                src: ['server/**/*.spec.js']
            },
            all: [
                'client/{app,components}/**/*.js',
                '!client/{app,components}/**/*.spec.js',
                '!client/{app,components}/**/*.mock.js'
            ],
            test: {
                src: [
                    'client/{app,components}/**/*.spec.js',
                    'client/{app,components}/**/*.mock.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*',
                        '!dist/.git*',
                        '!dist/.openshift',
                        '!dist/Procfile'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/'
                }]
            }
        },

        // Debugging with node inspector
        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost'
                }
            }
        },

        // Use nodemon to run server in debug mode with an initial breakpoint
        nodemon: {
            debug: {
                script: 'server/app.js',
                options: {
                    nodeArgs: ['--debug'],
                    ignore: ['node_modules/**'],
                    env: {
                        PORT: process.env.PORT || 9000
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            setTimeout(function () {
                                require('open')('http://localhost:8080/debug?port=5858');
                            }, 500);
                        });
                    }
                }
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            target: {
                src: 'client/index.html',
                ignorePath: 'client/',
                exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        'dist/public/{,*/}*.js',
                        'dist/public/{,*/}*.css',
                        'dist/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        'dist/public/assets/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['client/index.html'],
            options: {
                dest: 'dist/public'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['dist/public/{,*/}*.html'],
            css: ['dist/public/{,*/}*.css'],
            js: ['dist/public/{,*/}*.js'],
            options: {
                dirs: ['dist'],
                basedir: ['dist'],
                assetsDirs: [
                    'dist/public',
                    'dist/public/assets/images'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images'],
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved svg']
                    ]
                }
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'client/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'dist/public/assets/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'client/assets/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/public/assets/images'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '*/**.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        // Package all the html partials into a single javascript payload
        ngtemplates: {
            options: {
                // This should be the name of your apps angular module
                module: 'somapp',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                usemin: 'app/app.js'
            },
            main: {
                cwd: 'client',
                src: ['{app,components}/**/*.html'],
                dest: '.tmp/templates.js'
            },
            tmp: {
                cwd: '.tmp',
                src: ['{app,components}/**/*.html'],
                dest: '.tmp/tmp-templates.js'
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['dist/public/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'client',
                    dest: 'dist/public',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'bower_components/**/*',
                        'assets/images/{,*/}*.{webp}',
                        'assets/fonts/**/*',
                        'index.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: 'dist/public/assets/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    dest: 'dist',
                    src: [
                        'package.json',
                        'server/**/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: 'client',
                dest: '.tmp/',
                src: ['{app,components}/**/*.css']
            }
        },

        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                connectCommits: false,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'sass',
            ],
            test: [
                'sass',
            ],
            debug: {
                tasks: [
                    'nodemon',
                    'node-inspector'
                ],
                options: {
                    logConcurrentOutput: true
                }
            },
            dist: [
                'sass',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['server/**/*.spec.js']
        },

        protractor: {
            options: {
                configFile: 'client/test/e2e/protractor.conf.js',
                webdriverManagerUpdate: true
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            }
        },

        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            },
            all: localConfig
        },

        // Compiles Sass to CSS
        sass: {
            server: {
                options: {
                    loadPath: [
                        'client/bower_components',
                        'client/app',
                        'client/components'
                    ],
                    compass: false
                },
                files: {
                    '.tmp/app/app.css': 'client/app/app.scss'
                }
            }
        },

        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'client/index.html': [
                        ['{.tmp,client}/{app,components}/**/*.module.js',
                            '{.tmp,client}/{app,components}/**/*.js',
                            '!{.tmp,client}/app/app.js',
                            '!{.tmp,client}/app/app.module.js',
                            '!{.tmp,client}/{app,components}/**/*.spec.js',
                            '!{.tmp,client}/{app,components}/**/*.mock.js']
                    ]
                }
            },

            // Inject component scss into app.scss
            sass: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/app/', '');
                        filePath = filePath.replace('/client/components/', '');
                        return '@import \'' + filePath + '\';';
                    },
                    starttag: '// injector',
                    endtag: '// endinjector'
                },
                files: {
                    'client/app/app.scss': [
                        'client/{app,components}/**/*.{scss,sass}',
                        '!client/app/app.{scss,sass}'
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'client/index.html': [
                        'client/{app,components}/**/*.css'
                    ]
                }
            }
        },

        rsync: {
            options: {
                args: ["--verbose"],
                exclude: [".git*", "*.scss", "node_modules"],
                recursive: true
            },
            prod: {
                options: {
                    src: "dist/",
                    dest: "/opt/admin.self-o-matic.com",
                    host: "deploy@www.gumino.com",
                    delete: false
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            }
        }

    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
        }

        if (target === 'debug') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'concurrent:server',
                'concurrent:debug'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'env:all',
            'concurrent:server',
            'express:dev',
            'wait',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target === 'server') {
            return grunt.task.run([
                'env:all',
                'env:test',
                'mochaTest'
            ]);
        } else if (target === 'client') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                //  'concurrent:test',
                'karma'
            ]);
        } else if (target === 'e2e') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'env:test',
                'concurrent:test',
                'express:dev',
                'protractor'
            ]);
        } else grunt.task.run([
            'test:server'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'injector:sass',
        'concurrent:dist',
        'injector',
        'wiredep',
        'useminPrepare',
        'autoprefixer',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('deploy', [
        'build',
        //  TODO: Sistemare i test (quanto prima)
        //'test',
        'rsync:prod'
    ]);
};