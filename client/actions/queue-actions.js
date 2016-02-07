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
    post('/delete/'+ name + '/' + video.id.videoId, {}, (err, data) => {
      if(err) return dispatch({type: DELETE_VIDEO_FAIL, message: err.message})
      return dispatch({type: DELETE_VIDEO_SUCCESS, queue: data.queue, video})
    })
  }
}


export function enqueueVideo(name, video){
  return (dispatch) => {
    dispatch({type: ENQUEUE_VIDEO_SUBMIT})
    post('/enqueue/'+ name, video , (err, data) => {
      if(err) return dispatch({type: ENQUEUE_VIDEO_FAIL,  err: err.message});
      return dispatch({type: ENQUEUE_VIDEO_SUCCESS, queue: data.queue, video})
    })
  }
}
