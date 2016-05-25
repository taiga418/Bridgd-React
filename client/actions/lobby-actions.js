import {get, post} from '../utils/ajax-utils'

export const LOGIN_SUBMIT = "LOGIN_SUBMIT"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const CREATE_SUBMIT = "CREATE_SUBMIT"
export const CREATE_SUCCESS = "CREATE_SUCCESS"
export const CREATE_FAIL = "CREATE_FAIL"

export const TOGGLE_FORM = "TOGGLE_FORM";


export function submitLogin(login){
  return(dispatch) => {
    dispatch({type: LOGIN_SUBMIT})
    return post('/login' , login, (err, data) => {
      if(err) return dispatch({type: LOGIN_FAIL, err: err.message})
      // window.location = "/room/" + data.name
      return dispatch({type: LOGIN_SUCCESS, data})
    })
  }
}


export function submitNew(room){
  return(dispatch) => {
    dispatch({type: CREATE_SUBMIT})
    let obj = {name: room.newName, password: room.newPassword}
    return post('/lobby/create', obj, (err, data) => {
      if(err) return dispatch({type: CREATE_FAIL, err})
      window.location = "/room/" + data.name
      return dispatch({type: CREATE_SUCCESS, data})
    })
  }
}

export function toggleForm(form){
  return(dispatch) => {
    return dispatch({type:TOGGLE_FORM, form})
  }
}
