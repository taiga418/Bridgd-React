import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

import {socketUpdate, loadVideo} from '../actions/queue-actions.js'

import QueueStore from '../stores/queue-store.js';
import PlayerStore from '../stores/player-store.js';

import NavBar from './navbar.js'
import Player from './player.js'
import SearchBar from './search-bar.js'
import Queue from './queue.js'

injectTapEventPlugin();

//Main Landing Page of the App, houses all components. View Controller 
var App = React.createClass({

  componentDidMount: function(){
    this.socket = io();
    this.socket.emit('joined');

    this.socket.on('queueUpdate', function(queue){
      console.log('update')
      socketUpdate(queue);
    })

    this.socket.on('loadVideo', function(vid){
      console.log('update')
      loadVideo(vid)
    })
  },

  loadNext: function(){
    let state = QueueStore.getQueueState();
    let {videos, current, currentIndex} = state;
    let index;
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
    loadVideo(videos[index]);
  },

  render: function(){
    let{loadNext} = this;
    return(
      <div className="container">
        <NavBar className="nav" onSkip={this.loadNext}/>
        <div className="left-content">
          <Player next={loadNext}/>
          <SearchBar />
        </div>
        <div className="right-content">
          <Queue/>
        </div>
      </div>
    )
  }

})

module.exports = App;