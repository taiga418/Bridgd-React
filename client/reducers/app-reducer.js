import {combineReducers} from 'redux'
import {Map, List} from 'immutable';

import {
  //PLAY_VIDEO,
  PLAYER_INIT,
  LOAD_VIDEO_SUBMIT,
  LOAD_VIDEO_SUCCESS,
  LOAD_VIDEO_FAIL,
} from '../actions/player-actions'

import {
  DELETE_VIDEO_SUBMIT,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
} from '../actions/queue-actions'

import {
  SEARCH_SUBMIT,
  SEARCH_SUCCESS,
  SEARCH_FAIL
} from '../actions/app-actions'


const first =  (window.room.queue[0] && window.room.queue )? window.room.queue[0].id.videoId : 'e9R2uLN1uOE'
const playerState = {
  height: '390',
  width: '640',
  videoId: first,
  done: false
}

const videos = window.room.queue;
const current = window.room.queue.length > 0 ? window.room.queue[0] : null;
const name = window.room.name;

const APP_INITIAL_STATE = Map({results: null, showResults: true})
const PLAYER_INITIAL_STATE = Map({playerState})
const QUEUE_INITIAL_STATE = Map({videos, current, name, currentIndex: 0})
const SEARCH_INITIAL_STATE = Map({results: null, loading: false})

export function app(state=APP_INITIAL_STATE, action){
   switch(action.type){

   }
  return state
}

export function player(state=PLAYER_INITIAL_STATE, action){
  switch(action.type){
    case PLAYER_INIT:
      return state.set('playerObject', action.player)
    case LOAD_VIDEO_SUBMIT: 
      return state.set('loading', true)
    case LOAD_VIDEO_SUCCESS:
      console.log('hereherere')
      state.get('playerObject').loadVideoById(action.video.id.videoId)
      return state.set('loading', false)
    case LOAD_VIDEO_FAIL:
      return state.set('loading', false)
  }
  return state
}

export function queue(state=QUEUE_INITIAL_STATE, action){
   switch(action.type){
    case DELETE_VIDEO_SUBMIT:
    case LOAD_VIDEO_SUBMIT:
      return state.set('loading', true)
    case LOAD_VIDEO_SUCCESS:
      return state.set('loading', false).set('current', action.video)
    case DELETE_VIDEO_SUCCESS:
      return state.set('loading', false).set('videos', action.queue)
    case DELETE_VIDEO_FAIL:
    case LOAD_VIDEO_FAIL:
      return state.set('loading', false)
   }
  return state
}

export function search(state=SEARCH_INITIAL_STATE, action){
  switch(action.type){
    case SEARCH_SUBMIT:
      return state.set('loading', true)
    case SEARCH_SUCCESS:
      return state.set('loading', false).set('results', action.results)
  }
  return state
}


 export default combineReducers({app, player, queue, search})
