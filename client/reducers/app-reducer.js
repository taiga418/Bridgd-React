import {combineReducers} from 'redux'
import {Map, List} from 'immutable';

import {
  //PLAY_VIDEO,
  PLAYER_INIT,
  LOAD_VIDEO_SUBMIT,
  LOAD_VIDEO_SUCCESS,
  LOAD_VIDEO_FAIL,
} from '../actions/player-actions'


const APP_INITIAL_STATE = Map({results: null, showResults: true})

const first =  (window.room.queue[0] && window.room.queue )? window.room.queue[0].id.videoId : 'e9R2uLN1uOE'
const playerState = {
  height: '390',
  width: '640',
  videoId: first,
  done: false
}

const PLAYER_INITIAL_STATE = Map({playerState})

const videos = window.room.queue;
const current = window.room.queue.length > 0 ? window.room.queue[0] : null;
const name = window.room.name;

const QUEUE_INITIAL_STATE = Map({videos, current, name, currentIndex: 0})

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
      state.get('playerObject').loadVideoById(action.video.id.videoId)
      return state
  }
  return state
}

export function queue(state=QUEUE_INITIAL_STATE, action){
   switch(action.type){
    case LOAD_VIDEO_SUCCESS:
      return state.set('loading', false).set('current', action.video)
   }
  return state
}


 export default combineReducers({app, player, queue})
