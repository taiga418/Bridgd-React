import Dispatcher from '../dispatcher';
import {ActionTypes} from '../constants/constants';
import {EventEmitter} from 'events'
import assign from 'object-assign';

let CHANGE_EVENT = 'change';

let state = {loading: false, data: null, error: null}
let LobbyStore = assign({}, EventEmitter.prototype, {


  getLoginState: function(){
    return state;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

})


LobbyStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      state.loading = false;
      state.data = action.data;
      Store.emitChange();
      break;
    case ActionTypes.LOGIN_FAIL:
      state.loading = false;
      state.error = action.err;
      Store.emitChange();
    case ActionTypes.LOGIN_LOADING:
      state.loading = true;
      state.data = null;
      state.error = null;
      Store.emitChange();
  }
})

module.exports = LobbyStore;
