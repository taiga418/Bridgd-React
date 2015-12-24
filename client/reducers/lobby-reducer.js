import {combineReducers} from 'redux'
import {Map, List} from 'immutable';
import {
  LOGIN_SUBMIT, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 

  CREATE_SUBMIT,
  CREATE_SUCCESS, 
  CREATE_FAIL,

  TOGGLE_FORM} from '../actions/lobby-actions'

const LOBBY_INITIAL_STATE = Map({active: 'login', error:false});


export function lobby (state=LOBBY_INITIAL_STATE, action){
  switch(action.type){
    case LOGIN_SUBMIT:
    case CREATE_SUBMIT:
      return state.set('loading', true)
    case TOGGLE_FORM:
      return state.set('active', action.form).set('error', false)
    case LOGIN_SUCCESS:
    case CREATE_SUBMIT: 
      return state.set('loading', false).set('room', data);
    case LOGIN_FAIL:
    case CREATE_FAIL:
      return state.set('loading', false).set('error', action.data.error || true)
  }
  return state;
}

export default combineReducers({lobby})