module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    browserify: {
      buildApp: {
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
        tasks: ['browserify:buildApp'],
      },
    },
  })
  grunt.registerTask('build', ['browserify:buildApp', 'browserify:buildLobby']);
  grunt.registerTask('w', 'watch');
}
