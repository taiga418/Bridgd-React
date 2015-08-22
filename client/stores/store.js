var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';



var text = {message: "Double Binding; Start typing for demo"};
var Store = assign({}, EventEmitter.prototype, {

  getText: function(){
    return text;
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


Store.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SET_TEXT:
      text.message = action.text
      Store.emitChange();
      break;

    default:

  }
})

module.exports = Store;
