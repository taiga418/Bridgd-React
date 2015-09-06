import React from 'react';
import _ from 'underscore'
import PlayerStore from '../stores/player-store.js';
import QueueStore from '../stores/queue-store.js';
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
    var self = this;
    function onPlayerReady(event) {
      Actions.playVideo(event.target);
    }

    function onPlayerStateChange (event) {
      if(event.data == YT.PlayerState.ENDED){
        var state = QueueStore.getQueueState();
        var videos = state.videos;
        var currentVidObj = _.find(videos, function(vid){
          return vid.id.videoId == state.currentId
        })
        var currentIndex = videos.indexOf(currentVidObj) 
        Actions.loadVideo(videos[currentIndex + 1].id.videoId);
      }
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


  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({playerState: PlayerStore.getPlayerState()})
  },

  render: function(){
   return(
      <div className="player">
        <div>
         <div id="player"></div>
        </div>
        {window.onYouTubeIframeAPIReady = this.initPlayer()}
      </div>
    ) 
  }

})

module.exports = PlayerClass;