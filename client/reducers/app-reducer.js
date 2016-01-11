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
  SEARCH_FAIL,
  ENQUEUE_VIDEO_SUBMIT,
  ENQUEUE_VIDEO_SUCCESS,
  ENQUEUE_VIDEO_FAIL,
  SOCKET_UPDATE,
  SHUFFLE
} from '../actions/app-actions'


const first =  (window.room.queue[0] && window.room.queue )? window.room.queue[0].id.videoId : 'e9R2uLN1uOE'
const playerState = {
  height: '390',
  width: '640',
  videoId: first,
  done: false
}

function shuffle(array) {
  if(array.length ==0) return []
   var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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
    case ENQUEUE_VIDEO_SUBMIT:
      return state.set('loading', true)
    case LOAD_VIDEO_SUCCESS:
     let currentIndex = state.get('videos')
      .map((vid) => {
        return vid.id.videoId;
      })
      .indexOf(action.video.id.videoId)
      return state.set('loading', false).set('current', action.video).set('currentIndex', currentIndex)
    case DELETE_VIDEO_SUCCESS:
      return state.set('loading', false).set('videos', action.queue)
    case DELETE_VIDEO_FAIL:
    case LOAD_VIDEO_FAIL:
    case ENQUEUE_VIDEO_FAIL:
      return state.set('loading', false)
    case ENQUEUE_VIDEO_SUCCESS:
    case SOCKET_UPDATE:
      const queue = state.get('videos')
      if(action.queue.length == 1){
        state.set('current', action.queue[0])
      }
      return state.set('loading', false).set('videos', action.queue)
    case SHUFFLE:
      const {value} = action
      if(value){
        const queue = state.get('videos');
        let temp = queue.slice()
        temp = shuffle(temp)
        return state.set('shuffleQueue', temp)
      }else{
        return state.remove('shuffleQueue')
      }
   }
  return state
}

export function search(state=SEARCH_INITIAL_STATE, action){
  switch(action.type){
    case SEARCH_SUBMIT:
    case ENQUEUE_VIDEO_SUBMIT:
      return state.set('loading', true)
    case SEARCH_SUCCESS:
      return state.set('loading', false).set('results', action.results)
    case ENQUEUE_VIDEO_SUCCESS: 
      return state.set('loading', false)
  }
  return state
}


 export default combineReducers({app, player, queue, search})
