'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	}

	grunt.initConfig({
		config: config,

		copy: {
			dist_html: {
				// src 和 dest 键值对形式
				// files: [
				// 	{
				// 		src: '<%= config.app %>/index.html',
				// 		dest: '<%= config.dist %>/index.html'
				// 	},
				// 	{
				// 		src: '<%= config.app %>/js/index.js',
				// 		dest: '<%= config.dist %>/js/index.js'
				// 	}
				// ],

				// file object format 形式， key是dest，value是src
				// value可以是string、array等任意类型
				// files: {
				// 	'<%= config.dist %>/index.html': '<%= config.app %>/index.html',
				// 	'<%= config.dist %>/js/index.js': ['<%= config.app %>/js/index.js']
				// }

				files: [
					{
						expand: true,
						cwd: '<%= config.app %>/',
						src: '**/*.js', //'*.html',
						dest: '<%= config.dist %>/',
						ext: '.js', //'.min.html',
						// extDot: 'first' | 'last'
						flattern: true, // 去掉各层目录
						rename: function (dest, src) {
							return dest + src;
						}
					}
				]
				
			},

			// dist_js: {
			// 	src: '<%= config.app %>/js/index.js',
			// 	dest: '<%= config.dist %>/js/index.js'
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
				src: ['<%= config.dist %>/**/*'],

				// filter: 'isFile' 只删除文件，保留目录

				// 自定义filter函数
				filter: function (filepath) {
					return (!grunt.file.isDir(filepath));
				},
				//nonull
				// dot: true, .gitignore
				// matchBase: 匹配路径的baseName
				// expand: true; 处理动态的文件src到dest映射
			}
		}

	});
}