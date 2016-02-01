import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'


import NavBar from './navbar.js'
import Player from './player.js'
import SearchBar from './search-bar.js'
import Queue from './queue.js'

//HERE//
import {connect} from 'react-redux'
import * as playerActions from '../actions/player-actions'
import * as queueActions from '../actions/queue-actions'
import * as appActions from '../actions/app-actions'

const actionCreators = {...playerActions, ...queueActions, ...appActions}

function mapStateToProps(state) {
  const{app, player, queue, search} = state
  return {
    playerLoading: player.get('loading'),
    queueLoading: queue.get('loading'),
    playerObject: player.get('playerObject'),
    playerState: player.get('playerState'),
    videoQueue: queue.get('videos'),
    shuffleQueue: queue.get('shuffleQueue'),
    name: queue.get('name'),
    current: queue.get('current'),
    currentIndex: queue.get('currentIndex'),
    results: search.get('results')
  }
}

////////
injectTapEventPlugin();

//Main Landing Page of the App, houses all components. View Controller
class AppPure extends Component{

  constructor(props){
    super(props)
    this.socket = io();
  }

  componentDidMount(){
    this.socket.emit('joined', window.room._id);

    this.socket.on('queueUpdate', function(queue){
      this.props.socketUpdate(queue);
    }.bind(this))

    this.socket.on('loadVideo', function(vid){
      this.props.loadVideo(vid)
    }.bind(this))
  }

  queueVideo(vid, next){
    const{videoQueue, name, enqueueVideo} = this.props
    let videos = videoQueue
    let dupe = videos.filter(obj => {
      return obj.id.videoId == vid.id.videoId
    });
    if(dupe.length ==  0){
      enqueueVideo(name,vid);
    }else{
     next();
    }
  }

  loadNext(){
    let {loadVideo, current, currentIndex, videoQueue, name, shuffleQueue} = this.props;
    let index;
    //if shuffleMode is on, use the shuffled queue.
    if(shuffleQueue){
      videoQueue = shuffleQueue
    }
    //if current is the default video
    if(current == null){
      return loadVideo(name, videos[0])
    }
    if(videoQueue.length == 0){
      return;
    }
    //check index of current video, just in case we deleted the current vid
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

  render(){
    const{props} = this;

    const{playerObject, playerLoading, playerState, initPlayer, playVideo} = props;
    const{queueLoading, videoQueue, name, current, currentIndex, loadVideo, deleteVideo} = props;
    const{searchAPI, results} = props;
    const{signOut, shuffle, shuffleQueue} = props;

    const enqueueVideo = this.queueVideo.bind(this)
    const loadNext = this.loadNext.bind(this)
    return(
      <div className="container">
        <NavBar className="nav" {...{name, signOut, loadNext, shuffle, shuffleQueue}}/>
        <div className="left-content">
         <Player {...{playerObject,playerLoading,playerState, initPlayer, playVideo, loadVideo, current, currentIndex, videoQueue, name, loadNext}} loading={playerLoading}/>
         {/* <SearchBar onQueueVideo={queueVideo} onSearch={search} onHideResults={hideResults} {...{results, showResults}}/>*/}
          <SearchBar {...{searchAPI,enqueueVideo, results}}/>
        </div>
        <div className="right-content">
          <Queue {...{videoQueue, name, current, loadVideo, deleteVideo}} loading={queueLoading}/>
        </div>
      </div>
    )
  }

}
export default connect(mapStateToProps, actionCreators)(AppPure)
