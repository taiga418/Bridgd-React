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
  ENQUEUE_VIDEO_SUBMIT,
  ENQUEUE_VIDEO_SUCCESS,
  ENQUEUE_VIDEO_FAIL,
  DELETE_VIDEO_SUBMIT,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
} from '../actions/queue-actions'

import {
  SEARCH_SUBMIT,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
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

const videos = window.room.queue;
const current = window.room.queue.length > 0 ? window.room.queue[0] : null;
const name = window.room.name;

const APP_INITIAL_STATE = Map({results: null, showResults: true})
const PLAYER_INITIAL_STATE = Map({playerState})
const QUEUE_INITIAL_STATE = Map({videos, current, name, currentIndex: 0, shuffleQueue: null})
const SEARCH_INITIAL_STATE = Map({results: null, loading: false})


function shuffle(array) {
  if(array.length ==0) return []
   let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


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

function loadVideo (state, queue, shuffleQueue, video){
  let currentIndex;
  if(shuffleQueue){
    currentIndex = shuffleQueue
      .map((vid) => {
        return vid.id.videoId;
      })
      .indexOf(video.id.videoId)
    shuffleQueue.slice(currentIndex,1);
  }else{
    currentIndex = queue
      .map((vid) => {
        return vid.id.videoId;
      })
      .indexOf(video.id.videoId);
  }
  return state.set('current', video)
    .set('loading', false)
    .set('currentIndex', currentIndex)
    .set('shuffleQueue', shuffleQueue);
}

function enqueueVideo(state, queue, shuffleQueue, newQueue, currentIndex){
  if(shuffleQueue){
    //find new addition to the queue
    const newVid = newQueue[newQueue.length - 1];
    //add the new video
    shuffleQueue.push(newVid)
    //shuffle the unplayed videos
    let temp = shuffle(shuffleQueue.slice(currentIndex, shuffleQueue.length));
    //separate the unshuffled portion of it
    shuffleQueue = shuffleQueue.slice(0, currentIndex);
    //join the queue back together
    shuffleQueue = shuffleQueue.concat(temp);
    state.set('shuffleQueue', shuffleQueue)
  }else{
    if(queue.length == 1){
      state.set('current', newQueue[0])
    }
  }
  return state.set('loading', false).set('videos', newQueue)
}

function shuffleQueue(state, shuffle){
  if(shuffle){
    let temp = queue.slice()
    temp = shuffle(temp)
    return state.set('shuffleQueue', temp)
  }else{
    return state.remove('shuffleQueue')
  }
}
export function queue(state=QUEUE_INITIAL_STATE, action){
  let queue = state.get('videos');
  let shuffleQueue = state.get('shuffleQueue');
  let currentIndex = state.get('currentIndex');

   switch(action.type){
    case DELETE_VIDEO_SUBMIT:
    case LOAD_VIDEO_SUBMIT:
    case ENQUEUE_VIDEO_SUBMIT:
      return state.set('loading', true)
    case LOAD_VIDEO_SUCCESS:
      return loadVideo(state, queue, shuffleQueue, action.video)
    case DELETE_VIDEO_SUCCESS:
      return state.set('loading', false).set('videos', action.queue)
    case DELETE_VIDEO_FAIL:
    case LOAD_VIDEO_FAIL:
    case ENQUEUE_VIDEO_FAIL:
      return state.set('loading', false)
    case SOCKET_UPDATE:
      if(action.queue.length == 1){
        state.set('current', action.queue[0])
      }
      return state.set('loading', false).set('videos', action.queue)
    case ENQUEUE_VIDEO_SUCCESS:
      return enqueueVideo(state, queue, shuffleQueue, action.queue, currentIndex)
    case SHUFFLE:
      return shuffleQueue(state, action.value)
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
