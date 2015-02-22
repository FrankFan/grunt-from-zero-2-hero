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
				src: '<%= config.app %>/index.html',
				dest: '<%= config.dist %>/index.html'
			},

			dist_js: {
				src: '<%= config.app %>/js/index.js',
				dest: '<%= config.dist %>/js/index.js'
			}
		},

		clean: {
			dist: {
				src: '<%= config.dist %>/index.html'
			}
		}

	});
}