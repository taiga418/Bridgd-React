import React from 'react';
import PlayerStore from '../stores/player-store.js';

var PlayerClass = React.createClass({

  getInitialState: function(){
    return{
      player: PlayerStore.getPlayerState()
    }
  },

  componentDidMount: function(){
    //attach video onto div once the component has been mounted. 
    var player = new YT.Player('player', {
      height: this.state.player.height,
      width: this.state.player.width,
      videoId: this.state.player.videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })

    PlayerStore.addChangeListener(this._onChange);

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange (event) {
      console.log(event)
    }

    function  stopVideo() {
      console.log(player)
      player.stopVideo();
    }
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({playerState: PlayerStore.getPlayerState()})
  },

  search: function(e){
    console.log(e.target.value)
  },


  render: function(){
    return(
      <div>
        <div>
          <div id="player"></div>
        </div>
        <input onChange={this.search} />
      </div>
    )
   
  }

})

module.exports = PlayerClass;