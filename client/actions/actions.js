import $ from 'jquery';

var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {
  // getQueue: function(){
  //   $.get( "api/queue", function( data ) {
  //     Dispatcher.dispatch({
  //       type: ActionTypes.GET_QUEUE,
  //       data: data
  //     });
  //   }, function(err){
  //     Dispatcher.dispatch({
  //       type: ActionTypes.GET_QUEUE,
  //       err: err
  //     });
  //   });
  // },

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

  deleteVideo: function(video){
    $.ajax({
      method: 'POST',
      url: '/delete/'+ video.id.videoId, 
      success: function(data){
        console.log('actions', data)
        Dispatcher.dispatch({
          type: ActionTypes.DELETE_VIDEO,
          queue: data.queue 
        })
      },
      error: function(err){
        Dispatcher.dispatch({
          type: ActionTypes.DELETE_VIDEO,
          err: err
        })
      }
    })
  },

  enqueueVideo: function(video){
    $.ajax({
      method: 'POST',
      url: '/enqueue', 
      data: video,
      success: function(data){
        Dispatcher.dispatch({
          type: ActionTypes.ENQUEUE_VIDEO,
          queue: data.queue 
        })
      },
      error: function(err){
        Dispatcher.dispatch({
          type: ActionTypes.ENQUEUE_VIDEO,
          err: err
        })
      }
    })
  }
};