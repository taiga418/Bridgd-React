import {get, post} from '../utils/ajax-utils'

export const LOGIN_SUBMIT = "LOGIN_SUBMIT"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const TOGGLE_FORM = "TOGGLE_FORM";
export const CREATE_PASSWORD_ERROR = "CREATE_PASSWORD_ERROR";

export function submitLogin(login){
  return(dispatch) => {
    dispatch({type: LOGIN_SUBMIT})
    return post('/login' , login, (data) => {
      if(data.success) {
        window.location = "/room/" + data.name
        return dispatch({type: LOGIN_SUCCESS, data})
      }
      return dispatch({type: LOGIN_FAIL, data})
    })
  }
  // Dispatcher.dispatch({type: ActionTypes.LOGIN_LOADING});
  // $.ajax({
  //   method: 'POST',
  //   url: '/login',
  //   data: login,
  //   success: (data) => {
  //     window.location = "/room/" + data.name
  //     Dispatcher.dispatch({
  //       type: ActionTypes.LOGIN_SUCCESS,
  //       data: data
  //     });
  //   },
  //   error: (err) => {
  //     Dispatcher.dispatch({
  //       type: ActionTypes.LOGIN_FAIL,
  //       err: err
  //     });
  //   }
  // })
}

export function submitNew(room){

  return(dispatch) => {
    dispatch({type: LOGIN_SUBMIT})
    if(room.newPassword !== room.passwordConfirmation){
       return dispatch({type: CREATE_PASSWORD_ERROR})
    }
    let post = {name: room.newName, password: room.newPassword}
    return post('/lobby/create', post, (data) => {
      if(data.success) {
        window.location = "/room/" + data.name
        return dispatch({type: LOGIN_SUCCESS, data})
      }
      return dispatch({type: LOGIN_FAIL, data})
    })
  }
  // Dispatcher.dispatch({type: ActionTypes.LOGIN_LOADING});
  // $.ajax({
  //   method: 'POST',
  //   url: '/lobby/create',
  //   data: room,
  //   success: (data) => {
  //     window.location = "/room/" + data.name
  //     Dispatcher.dispatch({
  //       type: ActionTypes.LOGIN_SUCCESS,
  //       data: data
  //     });
  //   },
  //   error: (err) => {
  //     Dispatcher.dispatch({
  //       type: ActionTypes.LOGIN_FAIL,
  //       err: err
  //     });
  //   }
  // })
}

export function toggleForm(form){
  return(dispatch) => {
    return dispatch({type:TOGGLE_FORM, form})
  }
}




