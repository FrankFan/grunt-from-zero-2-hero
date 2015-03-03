/**
 *  purpose: 练习如何使用、配置grunt的各种task
 *  author: fanyong@gmail.com
 *  date: 2015-02-23
 */


// 使用严格的ES5模式
'use strict';

module.exports = function(grunt) {

  // 自动导入grunt官方的task
  require('load-grunt-tasks')(grunt);

  // 也可以用 loadNpmTasks 导入任务，但由于grunt官方维护的task太多，只需上面一句即可
  // grunt.loadNpmTasks('grunt-contrib-watch');

  // 生成task运行时间报告图
  require('time-grunt')(grunt);

  // 全局配置文件
  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,

    // 读取package.json文件
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist_html: {
        // 1. src 和 dest 键值对形式
        // files: [
        //  {
        //      src: '<%= config.app %>/index.html',
        //      dest: '<%= config.dist %>/index.html'
        //  },
        //  {
        //      src: '<%= config.app %>/js/index.js',
        //      dest: '<%= config.dist %>/js/index.js'
        //  }
        // ],

        // 2. file object format 形式， key是dest，value是src
        // value可以是string、array等任意类型
        // files: {
        //  '<%= config.dist %>/index.html': '<%= config.app %>/index.html',
        //  '<%= config.dist %>/js/index.js': ['<%= config.app %>/js/index.js']
        // }

        // 3. files array format
        files: [{
          expand: true,
          cwd: '<%= config.app %>/',
          src: '**/*.js', //'*.html',
          dest: '<%= config.dist %>/',
          ext: '.js', //'.min.html',
          // extDot: 'first' | 'last'
          flattern: true, // 去掉各层目录
          rename: function(dest, src) {
            return dest + src;
          }
        }]

      },

      // dist_js: {
      //  src: '<%= config.app %>/js/index.js',
      //  dest: '<%= config.dist %>/js/index.js'
      // }
    },

    clean: {
      dist: {
        // 1. 单独指定文件名
        // src: ['<%= config.dist %>/index.html',
        //  '<%= config.dist %>/js/index.js']

        // 2. 通配符
        // *：匹配任意字符，但是不匹配斜杠/
        // **：匹配任意数量的任意字符，包括斜杠
        // ?：只匹配一个字符，除了斜杠/
        // {a, b}.js: a.js or b.js
        // !: 取反
        // {,*/}*.webp 表示 *.webp 和 */*.webp 即根目录和一级目录，不包含更深层次的目录(为了性能考虑)
        src: ['<%= config.dist %>/**/*'],

        // filter: 'isFile' 只删除文件，保留目录

        // 自定义filter函数
        filter: function(filepath) {
          return (!grunt.file.isDir(filepath));
        },
        //nonull
        // dot: true, .gitignore
        // matchBase: 匹配路径的baseName
        // expand: true; 处理动态的文件src到dest映射
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          '<%= config.app %>/scripts/index.js',
          '<%= config.app %>/scripts/main1.js',
          '<%= config.app %>/scripts/main2.js',
          '<%= config.app %>/scripts/main3.js'
        ],
        dest: '<%= config.dist %>/scripts/concated.js'
      }
    },

    uglify: {
      options: {
        // 压缩后会生成与文件同名的.map文件，便于调试,尤其是调试CoffeeScript
        // sourceMap: true,

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '
        + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',

        mangle: true, // false: 不混淆变量名 true: 混淆变量名
        preserveComments: 'all', // alll: 不删除注释， false: 删除全部注释，some: 保留@preserve @license @cc_on等注释

        compress: {
          drop_console: true, // 去掉console语句
          // drop_debugger: true // 去掉debugger调试语句
        }
      },
      dist: {
        files: {
          '<%= config.dist %>/scripts/main.min.js': [
            '<%= config.app %>/scripts/index.js',
            '<%= config.app %>/scripts/main1.js',
            '<%= config.app %>/scripts/main2.js',
            '<%= config.app %>/scripts/main3.js'
          ]
        }
      }
    },

    cssmin: {
      minify: {
        expand: true, // 如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名
        cwd: '<%= config.app %>/styles/', // 需要处理的文件（input）所在的目录
        src: [ // // 表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符
              '*.css',
              '!*.min.css'
            ],
        dest: '<%= config.dist %>/styles/', // 表示处理后的文件名或所在目录(output)
        ext: '.min.css' // 表示处理后的文件后缀名
      },
      combine: {
        files: {
          '<%= config.dist %>/styles/main.min.css': [
            '<%= config.app %>/styles/*.css'
          ]
        }
      }
    },

    // 监听文件变化
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        // tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        // tasks: ['newer:copy:styles', 'autoprefixer']
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // 本地起一个server
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        base: '<%= config.app %>'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              // connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('.', connect.static(config.app)),
              connect.static(config.app)
            ];
          }
        }
      }
    }

  });


  // 注册组合任务
  grunt.registerTask('serve', 'start the server and preivew your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }

    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:dist',
      'connect:livereload',
      'watch'
    ]);
  });

  // 注册默认任务: 即直接运行 grunt
  grunt.registerTask('default', [
    'clean:dist',
    'connect:livereload',
    'watch'
  ]);
}
