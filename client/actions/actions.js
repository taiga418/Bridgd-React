import $ from 'jquery';

var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

//module.exports = {


  export function playVideo(player){
    Dispatcher.dispatch({
      type: ActionTypes.PLAY_VIDEO,
      player: player
    });
  }

  export function loadVideo(video, delay){
    $.ajax({
      method: 'POST',
      url: '/update/',
      data: video,
      success: function(data){
        Dispatcher.dispatch({
          type: ActionTypes.LOAD_VIDEO,
          video: data.video,
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
  }

  export function deleteVideo(video){
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
  }

  export function enqueueVideo(video){
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

  export function socketUpdate(queue){
    Dispatcher.dispatch({
      type: ActionTypes.SOCKET_UPDATE,
      queue: queue 
    })
  }
//};