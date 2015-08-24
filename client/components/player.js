import React from 'react';
import PlayerStore from '../stores/player-store.js';
var player;
var Player = React.createClass({
  getInitialState: function(){
    return{
      player: PlayerStore.getPlayerState()
    }
  },

  componentDidMount: function(){
    console.log(this.state.player);
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': this._onPlayerReady,
        'onStateChange': this._onPlayerStateChange
      }
    }).bind(this);
    PlayerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({playerState: PlayerStore.getPlayerState()})
  },

  _onPlayerReady: function(event) {
    event.target.playVideo();
  },

  _onPlayerStateChange: function (event) {
    if (event.data == window.YT.PlayerState.PLAYING && !this.state.done) {
      setTimeout(this._stopVideo(player), 6000);
      //this.setState({done:true});
    }
  },

  _stopVideo: function(player) {
    console.log(player)
    player.stopVideo();
  },


  render: function(){
   
    return(
      <div id="player"></div>
    )
   
  }

})

module.exports = Player;