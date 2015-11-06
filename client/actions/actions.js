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

  loadVideo: function(video, delay){
    $.ajax({
      method: 'POST',
      url: '/update/',
      data: video
      success: function(data){
        Dispatcher.dispatch({
          type: ActionTypes.LOAD_VIDEO,
          videoId: data.video.id.videoId,
          delay: delay
        })
      },
      error: function(err){
        Dispatcher.dispatch({
          type: ActionTypes.LOAD_VIDEO,
          error: err
        })
        console.log('error', err)
      }
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
  },

  socketUpdate: function(queue){
    Dispatcher.dispatch({
      type: ActionTypes.SOCKET_UPDATE,
      queue: queue 
    })
  }
};