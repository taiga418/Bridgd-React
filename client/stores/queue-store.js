var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var queueState = {videos: [], current: null, currentIndex: 0};

queueState.videos = window.room.queue || [];
queueState.current = window.room.queue.length > 0 ? window.room.queue[0] : null;
queueState.name = window.room.name;

var QueueStore = assign({}, EventEmitter.prototype, {

  getQueueState: function(){
    return queueState;
  },

  setQueueState: function(queue){
    queueState.videos = queue;
    this.emit(CHANGE_EVENT);
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
      if(action.err){
        console.log(action.err)
      }else{
        queueState.videos = action.queue
      }
      QueueStore.emitChange();
      break;
    case ActionTypes.LOAD_VIDEO:
      queueState.current = action.video
      queueState.currentIndex = queueState.videos
        .map((vid) => {
          return vid.id.videoId;
        })
        .indexOf(action.video.id.videoId)
      QueueStore.emitChange();
      break;
    case ActionTypes.DELETE_VIDEO:
      if(action.err){
        console.log(action.err)
      }else{
        queueState.videos = action.queue
      }
      QueueStore.emitChange();
      break;
    case ActionTypes.SOCKET_UPDATE:
      if(action.err){
        console.log(action.err)
      }else{
        queueState.videos = action.queue
      }
      QueueStore.emitChange();
      break;
  }
})


export default QueueStore