import React from 'react';
import Actions from '../actions/actions.js'
import Store from '../stores/store.js'
import Player from './player.js'
var App = React.createClass({

  getInitialState: function(){
    return{
      text: Store.getText()
    }
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({message: Store.getText()})
  },

  inputHandler: function(e){
    if(e){
      Actions.setText(e.target.value)
    }
  },
  render: function(){
    return(
      <div>
        <p>Landing</p>
        <input onChange={this.inputHandler} />
        <h1>{this.state.text.message}</h1>
        <Player></Player>
      </div>
    )
  }

})

module.exports = App;