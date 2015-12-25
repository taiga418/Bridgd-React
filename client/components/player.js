import React, {Component} from 'react';
//import PlayerStore from '../stores/player-store.js';
import QueueStore from '../stores/queue-store.js';
import {playVideo, loadVideo} from '../actions/queue-actions.js';
import {YoutubePlayer, globalPlayer} from './youtube-player.js';

class PlayerClass extends Component{

  constructor(props){
    super(props)
  }

  onPlayerReady(event) {
    this.props.initPlayer(event.target)
    this.props.playerObject.playVideo()
  }

  onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED){
      this.props.next();
    }
  }

  render(){
    const onPlayerReady = this.onPlayerReady.bind(this);
    const onPlayerStateChange = this.onPlayerStateChange.bind(this);

    const {videoId, width, height} = this.props.playerState

    return(
      <div>
        <div className="player-wrapper">
          <YoutubePlayer width={560} height={349} 
          className="player"
          videoID={videoId} 
          onPlayerReady={onPlayerReady} 
          onPlayerStateChange={onPlayerStateChange}/>
        </div>
      </div>
    ) 

    
   // }else{
    //   return false
    // }
  }

}

export default PlayerClass