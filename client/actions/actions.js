var Dispatcher = require('../dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

module.exports = {

  setText: function(text) {
    Dispatcher.dispatch({
      type: ActionTypes.SET_TEXT,
      text: text
    });
  }

};