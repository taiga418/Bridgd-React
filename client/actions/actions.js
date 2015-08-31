var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {

  setText: function(text){
    Dispatcher.dispatch({
      type: ActionTypes.SET_TEXT,
      text: text
    });
  },

  playVideo: function(player){
    Dispatcher.dispatch({
      type: ActionTypes.PLAY_VIDEO,
      player: player
    });
  },

  loadVideo: function(player, videoId, delay){
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_VIDEO,
      player: player,
      videoId: videoId,
      delay: delay
    })
  }

};