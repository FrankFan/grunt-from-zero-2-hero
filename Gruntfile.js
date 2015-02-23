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

  // 生成task运行时间报告图
  require('time-grunt')(grunt);

  // 全局配置文件
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // 读取package.json文件
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    config: config,

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
    }

  });
}