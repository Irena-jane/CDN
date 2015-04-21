module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config:{
      src:'src',
      dist:'public'
    },


    // ===========
    // STYLES TASK
    // ===========
    less : {
      styles: {
        options: {

          },
          files: {
            "<%= config.src %>/css/style.css": "<%= config.src %>/less/style.less"
          }
      }
    },



    autoprefixer: {
      styles: {
        options: {
          browsers: ['last 2 versions', 'ie 9']
        },
        src: '<%= config.src %>/css/style.css'
      },
    },

    cmq: {
      styles: {
        files: {
          '<%= config.src %>/css/style.css': ['<%= config.src %>/css/style.css']
        }
      }
    },


      cssmin: {
        options: {
          // shorthandCompacting: false,
          // roundingPrecision: -1
        },
        styles: {
          files: {
            '<%= config.src %>/css/style.min.css': [
            '<%= config.src %>/css/fontello/css/fontello.css',
            '<%= config.src %>/css/fontello/css/animation.css',
            '<%= config.src %>/css/style.css'

            ]
          }
        }
      },



      // ===========
      // SVG TASK
      // ===========

      // svgmin: {
      //   options: {
      //     plugins: [
      //       {
      //         removeDesc: true
      //       }
      //     ]
      //   },
      //   dist: {
      //     files: [{
      //       expand: true,
      //       cwd: '<%= config.src %>/_svg',
      //       src: ['!!ai','*.svg'],
      //       dest: '<%= config.src %>/_svg/svgmin'
      //     }]
      //   }
      // },


      // grunticon: {
      //   mysvg: {
      //     files: [{
      //       expand: true,
      //       cwd: '<%= config.src %>/_svg',
      //       src: ['svgmin/*.svg', '*.png'],
      //       dest: '<%= config.src %>'
      //     }],
      //     options: {
      //       enhanceSVG: true,
      //       datasvgcss   : 'css/grunticon-icons.data.svg.css',
      //       datapngcss   : 'css/grunticon-icons.data.png.css',
      //       urlpngcss    : 'css/grunticon-icons.fallback.css',
      //       previewhtml  : '_grunticon-preview.html',
      //       loadersnippet: 'js/grunticon.loader.js',
      //       pngfolder    : 'img/png',
      //       pngpath      : '../img/png',
      //       template     : '<%= config.src %>/_svg/_template.hbs',
      //       defaultWidth : '20px',
      //       defaultHeight: '20px'
      //     }
      //   }
      // },


      // =====
      // CLEAN
      // =====


      clean: {
        dist: '<%= config.dist %>',
        svg: [
          '<%= config.src %>/_svg/svgmin',
          '<%= config.src %>/img/svg/png-grunticon',
          '<%= config.src %>/css/grunticon*'
        ]
      },
       // =====
    // WATCH
    // =====

    watch: {

      // scripts: {
      //   files: ['<%= config.src %>/js/**/*.js'],
      //   tasks: ['scripts'],
      //   options: {
      //     spawn: false,
      //     livereload: true
      //   },
      // },


      less: {
        files: ['<%= config.src %>/less/**/*.less'],
        tasks: ['styles'],
        options: {
          spawn: false,
          livereload: true
        }
      },


      livereload: {
        options: { livereload: true },
        files: ['<%= config.src %>/**/*.html','<%= config.src %>/css/**/*.css','<%= config.src %>/js/**/*.js']
      }
    },



    // ==============
    // COPY & REPLACE
    // ==============


    copy: {
      stuff: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**','!**/less/**'],
        // src: [
        //   '**',
        //   '!**/styl/**', // no styl
        //   '!**/_*/**', // ignore '_name' folders
        //   '!**/js/**', // ignore all js
        //   'js/build/*'
        //   ],
        dest: '<%= config.dist %>'
      }
    },


    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /<script src=\"js\/build\/plugins.js/g,
              replacement: '<script src="js/build/plugins.min.js'
            },
            {
              match: /<script src=\"js\/build\/script.js/g,
              replacement: '<script src="js/build/script.min.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            src: ['<%= config.dist %>/**/*.html']
          }
        ]
      }
    },



    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/intro.js', 'src/project.js', 'src/google-map.js'],
        dest: 'js/script.js',
      },
    },
    // Lint Spaces in code
    lintspaces: {
      all: {
        src: [
          '*.html'
        ],
        options: {
          newline: true,
          newlineMaximum: 2,
          trailingspaces: true,
          indentationGuess: true,
          editorconfig: '.editorconfig',
          ignores: [
            'html-comments',
            'js-comments'
          ],
          showTypes: true,
          showCodes: true
        }
      }
    },



      notify_hooks: {
        options: {
          enabled: true,
          max_jshint_notifications: 5, // maximum number of notifications from jshint output
          title: "Project Name", // defaults to the name in package.json, or will use project directory's name
          success: false, // whether successful grunt executions should be notified automatically
          duration: 3 // the duration of notification in seconds, for `notify-send only
        }
      }



  });



  require('load-grunt-tasks')(grunt);

  grunt.registerTask('lint', ['lintspaces']);
  grunt.registerTask('c', ['copy']);
  grunt.registerTask('w', ['watch']);
  grunt.registerTask('styles', [
    'less',
    'autoprefixer',
    'cmq',
    'cssmin'
    ]);

  // grunt.registerTask('svg', [
  //   // 'clean:svg',
  //   'svgmin',
  //   'grunticon'
  // ]);
  // grunt.registerTask('default', ['concat']);
};
