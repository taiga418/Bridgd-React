import $ from 'jquery';

import Dispatcher from '../dispatcher';
import {ActionTypes} from '../constants/constants';

export function playVideo(player){
  Dispatcher.dispatch({
    type: ActionTypes.PLAY_VIDEO,
    player: player
  });
}

export function loadVideo(name, video, delay){
  $.ajax({
    method: 'POST',
    url: '/update/' + name,
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

export function deleteVideo(name, video){
  $.ajax({
    method: 'POST',
    url: '/delete/'+ name + '/' + video.id.videoId, 
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

export function enqueueVideo(name, video){
  $.ajax({
    method: 'POST',
    url: '/enqueue/'+ name, 
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

export function signOut(){
  $.ajax({
    method: 'POST',
    url: '/signout/'+ name,
    success: function(data){
      window.location = "/lobby"
    },
    error: function(err){
      console.log('err')
    }
  })
}
