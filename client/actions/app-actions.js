import {post} from '../utils/ajax-utils'
import $ from 'jquery'

export const SEARCH_SUBMIT = "SEARCH_SUBMIT"
export const SEARCH_SUCCESS = "SEARCH_SUCCESS"
export const SEARCH_FAIL = "SEARCH_FAIL"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const SOCKET_UPDATE = "SOCKET_UPDATE"
export const SHUFFLE = "SHUFFLE"

export function signOut(){
  return (dispatch) => {
    post('/signout/', null, (data) => {
      window.location = "/lobby"
      dispatch({type: LOGOUT_SUCCESS})
    })
  }
}

export function socketUpdate(queue){
  return (dispatch) => {
    dispatch({type: SOCKET_UPDATE, queue: queue })
  }
}

export function shuffle(value){
  return (dispatch) => {
    dispatch({type: SHUFFLE, value})
  }
}

export function searchAPI(query){
  return (dispatch) => {
    dispatch({type: SEARCH_SUBMIT})
      return $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: 'AIzaSyA-2P-UjlhcwiMC4P6z0z9f-SU7s4FMIJQ',
          type: 'video',
          maxResults: '8',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: query
        }
      })
      .done((data) => {
        dispatch({type: SEARCH_SUCCESS, results: data.items})
      })
  }
}

