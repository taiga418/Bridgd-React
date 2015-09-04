var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var queueState = {};
var videos = []

var QueueStore = assign({}, EventEmitter.prototype, {

  getQueueState: function(){
    queueState = {
     videos:videos,
     current: null
    };
    return queueState;
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

QueueStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type){
    case ActionTypes.ENQUEUE_VIDEO:
      queueState.videos.push(action.video)
      QueueStore.emitChange();
      break;
  }
})


export default QueueStore