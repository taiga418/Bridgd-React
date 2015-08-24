module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    browserify: {
    build: {
        options: {
            transform: [
                [require('grunt-react').browserify, {global: true}],
                 ["babelify", {loose:'all'}]
            ]
        },
        src: [ 'client/app.js'],
        dest: 'server/public/app.js'
      
      }
    },
    watch: {
      scripts: {
        files: 'client/**/*.js',
        tasks: ['build'],
      },
    },
  })
  grunt.registerTask('build', 'browserify:build');
  grunt.registerTask('w', 'watch');
}