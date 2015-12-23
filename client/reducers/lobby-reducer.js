import {combineReducers} from 'redux'
import {Map, List} from 'immutable';
import {LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOADING, TOGGLE_FORM} from '../actions/lobby-actions'

const LOBBY_INITIAL_STATE = Map({active: 'login', error:false});
const INITIAL_STATE = Map();


export function lobby (state=LOBBY_INITIAL_STATE, action){
  switch(action.type){
    case TOGGLE_FORM:
      return state.set('active', action.form)
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS')
      return state.set('loading', false).set('room', data);
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL')
      return state.set('loading', false).set('error', true)
  }
  return state;
}

export function create(state=INITIAL_STATE, action){
  return state;
}

export default combineReducers({lobby, create})