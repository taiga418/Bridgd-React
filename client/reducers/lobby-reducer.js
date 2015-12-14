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
      return state.set('loading', false).set('room', data);
  }
  return state;
}

export function create(state=INITIAL_STATE, action){
  return state;
}


export function login(state=INITIAL_STATE, action){
  switch(action.type){
    case LOGIN_SUBMIT:
    return state.set('loading', true)
    case LOGIN_SUCCESS:
      return state.set('loading', false).set('room', data);
  }
  return state;
}


export default combineReducers({lobby, create, login})