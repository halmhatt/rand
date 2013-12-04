module.exports = (grunt) ->

	grunt.initConfig(
		pkg: grunt.file.readJSON('package.json')

		coffee:
			options:
				bare: true
			compile:
				files:
					'rand.js': 'rand.coffee'

		uglify:
			js:
				files:
					'rand.min.js': 'rand.js'
	)


	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-uglify')

	grunt.registerTask('default', ['coffee:compile', 'uglify:js'])