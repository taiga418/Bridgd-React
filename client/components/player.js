import React, {Component} from 'react';
import {YoutubePlayer} from './youtube-player.js';

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
      let {loadVideo, current, currentIndex, videoQueue, name} = this.props;
      let index;

    //if current is the default video
    if(current == null){
      return loadVideo(name, videos[0])
    } 
    if(videoQueue.length == 0){
      return;
    }
    //check index of current video,
    let currentVidIndex = videoQueue
      .map((vid) => {
        return vid.id.videoId;
      }).indexOf(current.id.videoId)
    //if it's -1, then set current video to the video at current index
    if(currentVidIndex == -1){
      index = currentIndex
    //if it's not -1, then add 1. if that extends past the length of the queue, set to 0
    }else{
      index = currentIndex + 1
      if(index == videoQueue.length){
        index = 0;
      }
    }
    loadVideo(name, videoQueue[index]);
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
  }

}

export default PlayerClass