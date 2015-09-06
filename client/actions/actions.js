var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {


  playVideo: function(player){
    Dispatcher.dispatch({
      type: ActionTypes.PLAY_VIDEO,
      player: player
    });
  },

  loadVideo: function(videoId, delay){
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_VIDEO,
      videoId: videoId,
      delay: delay
    })
  },

  enqueueVideo: function(video){
    Dispatcher.dispatch({
      type: ActionTypes.ENQUEUE_VIDEO,
      video: video
    })
  }

};