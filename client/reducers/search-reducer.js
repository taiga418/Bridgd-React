import {Map} from 'immutable';
import {
  SEARCH_SUBMIT,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  SOCKET_UPDATE,
  SHUFFLE
} from '../actions/app-actions'

import {
  ENQUEUE_VIDEO_SUBMIT,
  ENQUEUE_VIDEO_SUCCESS,
} from '../actions/queue-actions'

const SEARCH_INITIAL_STATE = Map({results: null, loading: false})

export default function search(state=SEARCH_INITIAL_STATE, action){
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
