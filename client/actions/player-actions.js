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
    post('/update/' + name, video, (data) => {
      if(data.success){
        const {video} = data
        return dispatch({type: LOAD_VIDEO_SUCCESS, video})
      }
      return dispatch({type: LOAD_VIDEO_FAIL})
    })
  }
}
