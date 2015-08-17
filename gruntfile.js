module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
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
    }
  })
  grunt.registerTask('build', 'browserify:build');
}