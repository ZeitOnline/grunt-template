module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		env: {
			options: {
				VERSION: '<%= pkg.version %>'
			},
			dev: {
				NODE_ENV: 'development',
				DEST: 'temp'
			},
			dist: {
				NODE_ENV: 'production',
				DEST: 'dist'
			}
		},
		preprocess: {
			dev: {
				files: [
					{
						expand: true,
						cwd: "src/tpl/",
						src: ["**/*.html.tpl"],
						dest: "temp/dev/tpl/",
						ext: ".html.tpl"
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: "src/tpl/",
						src: [
							"**/*.html.tpl",
							"!**/*.dev.html.tpl"
						],
						dest: "temp/dist/tpl/",
						ext: ".html.tpl"
					}
				]
			}
		},
		template: {
			dist: {
				options: {
					data: {
						js_path: '',
						css_path: '',
						asset_path: 'assets/'
					}
				},
				files: [
					{
						expand: true,
						cwd: "temp/dist/tpl/",
						src: ["**/*.html.tpl"],
						dest: "dist/<%= pkg.version %>/",
						ext: ".html"
					}
				]
			},
			dev: {
				options: {
					data: {
						js_path: '../src/js/',
						coffee_path: '../temp/dev/js/coffee_compiled/',
						css_path: '../src/css/',
						sass_path: '../temp/dev/css/sass_compiled/',
						asset_path: '../src/assets/'
					}
				},
				files: [
					{
						expand: true,
						cwd: "temp/dev/tpl/",
						src: ["**/*.html.tpl"],
						dest: "dev/",
						ext: ".html"
					}
				]
			}
		},
		compass: {
			dev: {
				options: {
					environment: 'development',
					force: true,
					outputStyle: 'expanded',
					sassDir: "src/css/",
					cssDir: "temp/dev/css/sass_compiled/",
					imagesDir: "src/assets/",
					relativeAssets: true
				}
			},
			dist: {
				options: {
					environment: 'production',
					force: true,
					outputStyle: 'expanded',
					sassDir: "src/css/",
					cssDir: "temp/dist/css/sass_compiled/",
					imagesDir: "dist/<%= pkg.version %>/assets/",
					httpImagesPath: "assets/"
				}
			}
		},
		cssmin: {
			dist: {
				options: {
					report: 'gzip'
				},
				files: {
					"dist/<%= pkg.version %>/style.<%= pkg.version %>.css": ["dist/<%= pkg.version %>/style.<%= pkg.version %>.css"]
				}
			}
		},
		coffee: {
			dev: {
				files: [
					{
						expand: true,
						cwd: "src/js/",
						src: ["**/*.coffee"],
						dest: "temp/dev/js/coffee_compiled/",
						ext: ".js"
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: "src/js/",
						src: ["**/*.coffee"],
						dest: "temp/dist/js/coffee_compiled/",
						ext: ".js"
					}
				]
			}
		},
		jshint: {
		    lint: {
				files: [
					{
						expand: true,
						cwd: "src/js/",
						src: [
							"**/*.js",
							"**/*.json",
							"!**/libs/*js"
						]
					}
				]
		    }
		},
		uglify: {
			dist: {
				options: {
					mangle: false,
					preserveComments: false
				},
				src: 'dist/<%= pkg.version %>/script.<%= pkg.version %>.js',
				dest: 'dist/<%= pkg.version %>/script.<%= pkg.version %>.js'
			}
		},
		concat: {
			dist_js: {
				src: [
					"src/js/libs/*.js",
					"src/js/data/*.json",
					"src/js/*.js",
					"temp/dist/js/coffee_compiled/**/*.js"
				],
				dest: "dist/<%= pkg.version %>/script.<%= pkg.version %>.js"
			},
			dist_css: {
				src: [
					"src/css/libs/ui-lightness/jquery-ui-1.10.3.custom.css",
					"temp/dist/css/sass_compiled/**/*.css"
				],
				dest: "dist/<%= pkg.version %>/style.<%= pkg.version %>.css"
			}
		},
		copy: {
			dist_assets: {
				files: [
					{
						expand: true,
						cwd: 'src/assets/',
						src: ['**/*'],
						dest: "dist/<%= pkg.version %>/assets/"
					}
				]
			}
		},
		clean: {
			dist_before: ["dist/<%= pkg.version %>/"],
		  	dist_after: ["temp/dist/"]
		},
		compress: {
			dist: {
				options: {
				  archive: 'dist/<%= pkg.version %>.zip'
				},
				files: [
					{
						cwd: 'dist/<%= pkg.version %>/',
						src: ['**'],
						dest: '',
						expand: true
					}
				]
			}
		},
		watch: {
			html: {
				files: ["src/tpl/**/*.tpl"],
				tasks: ["env:dev", "preprocess:dev", "template:dev"]
			},
			js: {
				files: ["src/js/**/*.coffee"],
				tasks: ["env:dev", "coffee:dev"]
			},
			data: {
				files: ["src/js/data/**/*"],
				tasks: ["env:dev", "coffee:dev"]
			},
			css: {
				files: ["src/css/**/*"],
				tasks: ["env:dev", "compass:dev"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [
		'env:dev',
		'preprocess:dev',
		'template:dev',
		'compass:dev',
		'coffee:dev',
		'jshint:lint'
	]);
	grunt.registerTask('dist', [
		'env:dist',
		'clean:dist_before',
		'copy:dist_assets',
		'preprocess:dist',
		'template:dist',
		'compass:dist',
		'concat:dist_css',
		'coffee:dist',
		'jshint:lint',
		'concat:dist_js',
		'uglify:dist',
		'cssmin:dist',
		'compress:dist',
		'clean:dist_after'
	]);

};
fi