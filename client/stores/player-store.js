var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';



var PlayerStore = assign({}, EventEmitter.prototype, {

  getPlayerState: function(){
    return{
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      done: false
    }
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


PlayerStore.dispatchToken = Dispatcher.register(function(action) {

})

module.exports = PlayerStore;