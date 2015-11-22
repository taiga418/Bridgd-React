var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    SET_TEXT: null,
    PLAY_VIDEO: null,
    STOP_VIDEO: null,
    LOAD_VIDEO:null,
    DELETE_VIDEO:null,
    ENQUEUE_VIDEO: null,
    SOCKET_UPDATE: null,
    LOGIN_SUCCESS: null,
    LOGIN_FAIL: null,
    LOGIN_LOADING: null
  })

};