import React from 'react';
import PlayerStore from '../stores/player-store.js';
import Actions from '../actions/actions.js';
var PlayerClass = React.createClass({

  getInitialState: function(){
    return{
      playerInfo: PlayerStore.getPlayerState(),
      player: null
    }
  },

  componentDidMount: function(){
    PlayerStore.addChangeListener(this._onChange);
    //load player api
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  initPlayer: function(){
    // var player
    var self = this;
    function onPlayerReady(event) {
      Actions.playVideo(event.target);
    }

    function onPlayerStateChange (event) {
      //console.log(event)
    }

    function stopVideo() {
      //Actions.stopVideo(player)
    }

    function onYouTubeIframeAPIReady() {
       var player = new YT.Player('player', {
        height: self.state.playerInfo.height,
        width: self.state.playerInfo.width,
        videoId: self.state.playerInfo.videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        playerVars: {
          controls: '0',
          disabled: '1'
        }
      })
      self.setState({player: player});
    }

    return onYouTubeIframeAPIReady;

   
  },

  loadVideo: function(e){
    Actions.loadVideo(this.state.player, "nyYG70aM9Fw")
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
        {window.onYouTubeIframeAPIReady = this.initPlayer()}
        <button onClick={this.loadVideo}>Change</button>
      </div>
    ) 
  }

})

module.exports = PlayerClass;