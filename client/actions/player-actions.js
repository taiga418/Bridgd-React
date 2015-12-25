import {get, post} from '../utils/ajax-utils'

//player constants
export const PLAYER_INIT = "PLAYER_INIT"
export const PLAY_VIDEO = "PLAY_VIDEO"
export const LOAD_VIDEO_SUBMIT = "LOAD_VIDEO_SUBMIT"
export const LOAD_VIDEO_SUCCESS = "LOAD_VIDEO_SUCCESS"
export const LOAD_VIDEO_FAIL = "LOAD_VIDEO_FAIL"

export function initPlayer(player){
  return (dispatch) => {
    dispatch({type: PLAYER_INIT, player})
  }
}

export function playVideo(player){
  return (dispatch) => {
    dispatch({type: PLAY_VIDEO, player})
  }
}

export function loadVideo(name, video, delay){
  return (dispatch) => {
    dispatch({type: LOAD_VIDEO_SUBMIT})
    post('/update/' + name, video, (err, data) => {
      if(data.success){
        const {video} = data
        return dispatch({type: LOAD_VIDEO_SUCCESS, video})
      }
      return dispatch({type: LOAD_VIDEO_FAIL})
    })
  }
}
//   $.ajax({
//     method: 'POST',
//     url: '/update/' + name,
//     data: video,
//     success: function(data){
//       Dispatcher.dispatch({
//         type: ActionTypes.LOAD_VIDEO,
//         video: data.video,
//         delay: delay
//       })
//     },
//     error: function(err){
//       Dispatcher.dispatch({
//         type: ActionTypes.LOAD_VIDEO,
//         error: err
//       })
//       console.log('error', err)
//     }
//   })
// }

// export function deleteVideo(name, video){
//   $.ajax({
//     method: 'POST',
//     url: '/delete/'+ name + '/' + video.id.videoId, 
//     success: function(data){
//       console.log('actions', data)
//       Dispatcher.dispatch({
//         type: ActionTypes.DELETE_VIDEO,
//         queue: data.queue 
//       })
//     },
//     error: function(err){
//       Dispatcher.dispatch({
//         type: ActionTypes.DELETE_VIDEO,
//         err: err
//       })
//     }
//   })
// }

// export function enqueueVideo(name, video){
//   $.ajax({
//     method: 'POST',
//     url: '/enqueue/'+ name, 
//     data: video,
//     success: function(data){
//       Dispatcher.dispatch({
//         type: ActionTypes.ENQUEUE_VIDEO,
//         queue: data.queue,
//         current: data.current
//       })
//     },
//     error: function(err){
//       Dispatcher.dispatch({
//         type: ActionTypes.ENQUEUE_VIDEO,
//         err: err
//       })
//     }
//   })
// }

// export function socketUpdate(queue){
//   Dispatcher.dispatch({
//     type: ActionTypes.SOCKET_UPDATE,
//     queue: queue 
//   })
// }

// export function signOut(){
//   $.ajax({
//     method: 'POST',
//     url: '/signout/'+ name,
//     success: function(data){
//       window.location = "/lobby"
//     },
//     error: function(err){
//       console.log('err')
//     }
//   })
// }


