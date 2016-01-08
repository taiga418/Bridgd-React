import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

import {socketUpdate, loadVideo, signOut, enqueueVideo} from '../actions/queue-actions.js'

import QueueStore from '../stores/queue-store.js';
import PlayerStore from '../stores/player-store.js';

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
 
  queueVideo(vid, callback){
    const{videoQueue, name, enqueueVideo} = this.props
    let videos = videoQueue
    let dupe = videos.filter(obj => {
      return obj.id.videoId == vid.id.videoId
    });
    if(dupe.length ==  0){
      enqueueVideo(name,vid);
    }else{
     callback();
    }
  }

  render(){
    console.log('props', this.props)
    const{props} = this;

    const{playerObject, playerLoading, playerState, initPlayer, playVideo} = props;
    const{queueLoading, videoQueue, name, current, currentIndex, loadVideo, deleteVideo} = props;
    const{searchAPI, results} = props;
    const{signOut} = props;

    const enqueueVideo = this.queueVideo.bind(this)
    // let{results,showResults} = state;
    return(
      <div className="container">
        <NavBar className="nav" onSignOut={signOut}/>
        <div className="left-content">
         <Player {...{playerObject,playerLoading,playerState, initPlayer, playVideo, loadVideo, current, currentIndex, videoQueue, name}} loading={playerLoading}/>
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

