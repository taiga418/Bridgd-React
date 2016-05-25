import {Map, List} from 'immutable';

import {
  //PLAY_VIDEO,
  PLAYER_INIT,
  LOAD_VIDEO_SUBMIT,
  LOAD_VIDEO_SUCCESS,
  LOAD_VIDEO_FAIL,
} from '../actions/player-actions'

import {
  ENQUEUE_VIDEO_SUBMIT,
  ENQUEUE_VIDEO_SUCCESS,
  ENQUEUE_VIDEO_FAIL,
  DELETE_VIDEO_SUBMIT,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
} from '../actions/queue-actions'

//server rendering the initial state
const first =  (window.room && window.room.queue[0] && window.room.queue )
  ? window.room.queue[0].id.videoId : 'e9R2uLN1uOE'
const playerState = {
  height: '390',
  width: '640',
  videoId: first,
  done: false
}

const PLAYER_INITIAL_STATE = Map({playerState})

export default function player(state=PLAYER_INITIAL_STATE, action){
  switch(action.type){
    case PLAYER_INIT:
      return state.set('playerObject', action.player)
    case LOAD_VIDEO_SUBMIT:
      return state.set('loading', true)
    case LOAD_VIDEO_SUCCESS:
      state.get('playerObject').loadVideoById(action.video.id.videoId)
      return state.set('loading', false)
    case LOAD_VIDEO_FAIL:
      return state.set('loading', false)
  }
  return state
}
