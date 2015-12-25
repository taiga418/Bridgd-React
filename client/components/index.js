import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'
import $ from 'jquery';

import {socketUpdate, loadVideo, signOut, enqueueVideo} from '../actions/queue-actions.js'

import QueueStore from '../stores/queue-store.js';
import PlayerStore from '../stores/player-store.js';

import NavBar from './navbar.js'
import Player from './player.js'
import SearchBar from './search-bar.js'
import Queue from './queue.js'

//HERE//
import {connect} from 'react-redux'
import * as actionCreators from '../actions/player-actions'

function mapStateToProps(state) {
  const{app, player, queue} = state
  console.log('satate', state, player)
  return {
    playerObject: player.get('playerObject'),
    playerLoading: player.get('loading'),
    playerState: player.get('playerState'),
    videoQueue: queue.get('videos'),
    name: queue.get('name'),
    current: queue.get('current')
  }
}

////////
injectTapEventPlugin();

//Main Landing Page of the App, houses all components. View Controller 
class AppPure extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.socket = io();
    this.socket.emit('joined', window.room._id);

    this.socket.on('queueUpdate', function(queue){
      socketUpdate(queue);
    })

    this.socket.on('loadVideo', function(vid){
      loadVideo(vid)
    })
  }

  loadNext(){
    let state = QueueStore.getQueueState();
    let {videos, current, currentIndex, name} = state;
    let index;
    //if current is the default video
    if(current == null){
      return loadVideo(name, videos[0])
    } 
    if(videos.length == 0){
      return;
    }
    //check index of current video,
    let currentVidIndex = videos
      .map((vid) => {
        return vid.id.videoId;
      }).indexOf(current.id.videoId)
    //if it's -1, then set current video to the video at current index
    if(currentVidIndex == -1){
      index = currentIndex
    //if it's not -1, then add 1. if that extends past the length of the queue, set to 0
    }else{
      index = currentIndex + 1
      if(index == videos.length){
        index = 0;
      }
    }
    loadVideo(name, videos[index]);
  }

  signOut(){
    signOut()
  }

  queueVideo(vid, callback){
    let queueState = QueueStore.getQueueState()
    let videos = queueState.videos;
    let name = queueState.name;
    let dupe = videos.filter(obj => {
      return obj.id.videoId == vid.id.videoId
    });
    if(dupe.length ==  0){
      enqueueVideo(name,vid);
    }else{
     callback();
    }
  }

  search(e){
    let query = e.target.value;
    if(query.length > 2){
       $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: 'AIzaSyA-2P-UjlhcwiMC4P6z0z9f-SU7s4FMIJQ',
          type: 'video',
          maxResults: '8',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: query
        }
      })
      .done( function (data) {
        this.setState({results: data.items, showResults: true})
      }.bind(this))
    }
  }

  hideResults(){
    this.setState({showResults: false});
  }


  render(){
    console.log('props', this.props)
    let{loadNext, signOut, hideResults, queueVideo, search, state, props} = this;
    const{playerObject, playerLoading, playerState, initPlayer, playVideo, videoQueue, name, current, loadVideo} = props
    // let{results,showResults} = state;
    return(
      <div className="container">
        {/*<NavBar className="nav" onSkip={loadNext} onSignOut={signOut}/>*/}
        <div className="left-content">
         <Player {...{playerObject,playerLoading,playerState, initPlayer, playVideo}} next={loadNext}/>
         {/* <SearchBar onQueueVideo={queueVideo} onSearch={search} onHideResults={hideResults} {...{results, showResults}}/>*/}
        </div>
        <div className="right-content">
          <Queue {...{videoQueue, name, current, loadVideo}}/>
        </div>
      </div>
    )
  }

}
export default connect(mapStateToProps, actionCreators)(AppPure)

