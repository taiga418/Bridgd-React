var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

// var player = new window.YT.Player('player', {
//   height: '390',
//   width: '640',
//   videoId: 'M7lc1UVf-VE',
//   events: {
//     'onReady': onPlayerReady,
//     'onStateChange': onPlayerStateChange
//   }
// })

// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// var done;
// function onPlayerStateChange (event) {
//   if (event.data == window.YT.PlayerState.PLAYING && !this.state.done) {
//     setTimeout(stopVideo(), 6000);
//     done = true;
//   }
// }

// function stopVideo() {
//   player.stopVideo();
// }

var PlayerStore = assign({}, EventEmitter.prototype, {

  getPlayerState: function(){
    return{
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE'
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

})


PlayerStore.dispatchToken = Dispatcher.register(function(action) {

})

module.exports = PlayerStore;