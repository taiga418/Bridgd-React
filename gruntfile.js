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
      
      },
      buildLobby: {
        options: {
            transform: [
                [require('grunt-react').browserify, {global: true}],
                 ["babelify", {loose:'all'}]
            ]
        },
        src: [ 'client/lobby.js'],
        dest: 'server/public/lobby.js'
      
      }
    },
    watch: {
      scripts: {
        files: 'client/**/*.js',
        //tasks: ['browserify:buildApp'],
        tasks: ['browserify:buildLobby'],
      },
    },
  })
  grunt.registerTask('build', ['browserify:buildApp', 'browserify:buildLobby']);
  grunt.registerTask('w', 'watch');
}