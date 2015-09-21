import React from 'react';
import _ from 'underscore'
import PlayerStore from '../stores/player-store.js';
import QueueStore from '../stores/queue-store.js';
import Actions from '../actions/actions.js';
import {YoutubePlayer, globalPlayer} from './youtube-player.js';

var PlayerClass = React.createClass({

  getInitialState: function(){
    return{
      playerInfo: PlayerStore.getPlayerState(),
      player: null
    }
  },

  componentDidMount: function(){
    PlayerStore.addChangeListener(this._onChange);
  },


  onPlayerReady: function(event) {
    this.setState({player: event.target});
    Actions.playVideo(event.target);
  },

  onPlayerStateChange: function(event) {
    if(event.data == YT.PlayerState.ENDED){
      var state = QueueStore.getQueueState();
      var videos = state.videos;
      var currentVidObj = _.find(videos, function(vid){
        return vid.id.videoId == state.currentId
      })
      var currentIndex = videos.indexOf(currentVidObj);
      if(currentIndex == videos.length - 1){
        currentIndex = -1;
      } 
      Actions.loadVideo(videos[currentIndex + 1].id.videoId);
    }
  },

  stopVideo: function() {
    //Actions.stopVideo(player)
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({playerState: PlayerStore.getPlayerState()})
  },

  render: function(){
    const { videoId, width, height } = this.state.playerInfo
    return(
      <div className="player">
        <div>
          <YoutubePlayer width={width} height={height} 
          videoID={videoId} 
          onPlayerReady={this.onPlayerReady.bind(this)} 
          onPlayerStateChange={this.onPlayerStateChange}/>
        </div>
      </div>
    ) 
  }

})

module.exports = PlayerClass;