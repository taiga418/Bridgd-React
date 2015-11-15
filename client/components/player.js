import React from 'react';
import PlayerStore from '../stores/player-store.js';
import QueueStore from '../stores/queue-store.js';
import {playVideo, loadVideo} from '../actions/actions.js';
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
    playVideo(event.target);
  },

  onPlayerStateChange: function(event) {
    if(event.data == YT.PlayerState.ENDED){
      var state = QueueStore.getQueueState();
      var videos = state.videos;
      var currentVidObj = videos.find(vid => {
        return vid.id.videoId == state.currentId
      })
      var currentIndex = videos.indexOf(currentVidObj);
      if(currentIndex == videos.length - 1){
        currentIndex = -1;
      } 
      loadVideo(videos[currentIndex + 1]);
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
      <div className="player-wrapper">
        <YoutubePlayer width={560} height={349} 
        className="player"
        videoID={videoId} 
        onPlayerReady={this.onPlayerReady} 
        onPlayerStateChange={this.onPlayerStateChange}/>
      </div>
    ) 
  }

})

module.exports = PlayerClass;