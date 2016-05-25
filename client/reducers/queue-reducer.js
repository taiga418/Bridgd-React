import { Map } from 'immutable';

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
  SOCKET_UPDATE,
  SHUFFLE
} from '../actions/app-actions'

const videos = window.room ? window.room.queue : [];
const current = (window.room && window.room.queue.length > 0)
  ? window.room.queue[0] : null;
const name = window.roo ? window.room.name : null;

const QUEUE_INITIAL_STATE = Map({videos, current, name, currentIndex: 0, shuffleQueue: null})

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

function enqueueVideo(state, queue, shuffleQueue, newQueue, currentIndex , newVid){
  if(shuffleQueue){
    //find new addition to the queue
    // const newVid = newQueue[newQueue.length - 1];
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

function deleteVideo(state, shuffleQueue, newQueue, vid) {
  if(shuffleQueue){
    const index = shuffleQueue.indexOf(vid);
    shuffleQueue.splice(index, 1);
    state.set('shuffleQueue', shuffleQueue)//.set('currentIndex', )
  }
  return state.set('loading', false).set('videos', newQueue)
}

function shuffleVideos(state, queue, shuffleQueue, current, isShuffle){
  let currentIndex;
  if(isShuffle){
    //change current index to the index of the current vid in the shuffle queue
    currentIndex = queue.indexOf(current);
    let temp = queue.slice()
    temp = shuffle(temp)
    return state.set('shuffleQueue', temp).set('currentIndex', currentIndex)
  }else{
    currentIndex = queue.indexOf(current);
    return state.remove('shuffleQueue').set('currentIndex', currentIndex);
  }
}

export default function queue(state=QUEUE_INITIAL_STATE, action){
  let queue = state.get('videos');
  let shuffleQueue = state.get('shuffleQueue');
  let currentIndex = state.get('currentIndex');
  let current = state.get('current');

   switch(action.type){
    case DELETE_VIDEO_SUBMIT:
    case LOAD_VIDEO_SUBMIT:
    case ENQUEUE_VIDEO_SUBMIT:
      return state.set('loading', true)
    case LOAD_VIDEO_SUCCESS:
      return loadVideo(state, queue, shuffleQueue, action.video)
    case DELETE_VIDEO_SUCCESS:
      return deleteVideo(state, shuffleQueue, action.queue,  action.video)
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
      return enqueueVideo(state, queue, shuffleQueue, action.queue, currentIndex, action.video)
    case SHUFFLE:
      return shuffleVideos(state, queue, shuffleQueue, current, action.value)
   }
  return state
}
