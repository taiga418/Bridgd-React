import {get, post} from '../utils/ajax-utils'

export const DELETE_VIDEO_SUBMIT = "DELETE_VIDEO_SUBMIT"
export const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS"
export const DELETE_VIDEO_FAIL = "DELETE_VIDEO_FAIL"

export const ENQUEUE_VIDEO_SUBMIT = "ENQUEUE_VIDEO_SUBMIT"
export const ENQUEUE_VIDEO_SUCCESS = "ENQUEUE_VIDEO_SUCCESS"
export const ENQUEUE_VIDEO_FAIL = "ENQUEUE_VIDEO_FAIL"

export function deleteVideo(name, video){
  return (dispatch) => {
    dispatch({type: DELETE_VIDEO_SUBMIT})
    post('/delete/'+ name + '/' + video.id.videoId, {}, (data) => {
      if(data.success){
        return dispatch({type: DELETE_VIDEO_SUCCESS, queue: data.queue})
      }
      return dispatch({type: DELETE_VIDEO_FAIL})
    })
  }
}


export function enqueueVideo(name, video){

  return (dispatch) => {
    dispatch({type: ENQUEUE_VIDEO_SUBMIT})
    post('/enqueue/'+ name, video , (data) => {
      //if(data.success){
        return dispatch({type: ENQUEUE_VIDEO_SUCCESS, queue: data.queue})
      //}
      //return dispatch({type: ENQUEUE_VIDEO_FAIL})
    })
  }

  // $.ajax({
  //   method: 'POST',
  //   url: '/enqueue/'+ name, 
  //   data: video,
  //   success: function(data){
  //     Dispatcher.dispatch({
  //       type: ActionTypes.ENQUEUE_VIDEO,
  //       queue: data.queue,
  //       current: data.current
  //     })
  //   },
  //   error: function(err){
  //     Dispatcher.dispatch({
  //       type: ActionTypes.ENQUEUE_VIDEO,
  //       err: err
  //     })
  //   }
  // })
}


