import $ from 'jquery';

import Dispatcher  from '../dispatcher' 
import {ActionTypes} from '../constants/constants'

export function submitLogin(login){
  Dispatcher.dispatch({type: ActionTypes.LOGIN_LOADING});
  $.ajax({
    method: 'POST',
    url: '/login',
    data: login,
    success: (data) => {
      window.location = "/room/" + login.name
      Dispatcher.dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        data: data
      });
    },
    error: (err) => {
      Dispatcher.dispatch({
        type: ActionTypes.LOGIN_FAIL,
        err: err
      });
    }
  })
}