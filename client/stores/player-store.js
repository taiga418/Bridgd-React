var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var playerState = {};
var player = {};

var PlayerStore = assign({}, EventEmitter.prototype, {

  getPlayerState: function(){
    playerState = {
      height: '390',
      width: '640',
      videoId: 'e9R2uLN1uOE',
      done: false
    };
    return playerState;
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
  switch(action.type){
    case ActionTypes.PLAY_VIDEO:
      player = action.player
      player.playVideo();
      PlayerStore.emitChange();
      break;
    case ActionTypes.LOAD_VIDEO:
      if(action.err){
        return console.log('err', err)
      }
      player.loadVideoById(action.videoId, action.delay);
      playerState.videoId = action.videoId;
      PlayerStore.emitChange();
      break;
  }
})

module.exports = PlayerStore;