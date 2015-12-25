import {combineReducers} from 'redux'
import {Map, List} from 'immutable';

import {
  //PLAY_VIDEO,
  PLAYER_INIT,
  LOAD_VIDEO_SUBMIT,
  LOAD_VIDEO_SUCCESS,
  LOAD_VIDEO_FAIL,
} from '../actions/app-actions'


const APP_INITIAL_STATE = Map({results: null, showResults: true})

const first =  (window.room.queue[0] && window.room.queue )? window.room.queue[0].id.videoId : 'e9R2uLN1uOE'
const playerState = {
  height: '390',
  width: '640',
  videoId: first,
  done: false
}


const PLAYER_INITIAL_STATE = Map({playerState})
const QUEUE_INITIAL_STATE = Map({results: null, showResults: true})

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
      return state.set('loading', false)
  }
  return state
}

export function queue(state=QUEUE_INITIAL_STATE, action){
   switch(action.type){

   }
  return state
}


 export default combineReducers({app, player, queue})
