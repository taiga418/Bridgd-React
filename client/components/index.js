import React from 'react';

import {socketUpdate, loadVideo} from '../actions/actions.js'

import QueueStore from '../stores/queue-store.js';
import PlayerStore from '../stores/player-store.js';

import Player from './player.js'
import SearchBar from './search-bar.js'
import Queue from './queue.js';

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

  skip: function(){
    var state = QueueStore.getQueueState();
    var videos = state.videos;
    var currentVidObj = videos.find(vid => {
      return vid.id.videoId == state.currentId
    })
    var currentIndex = videos.indexOf(currentVidObj) 
    if(currentIndex == videos.length - 1){
      currentIndex = -1;
    }
    console.log(currentIndex, videos[currentIndex + 1], videos)
    loadVideo(videos[currentIndex + 1]);
  },

  render: function(){
    return(
      <div>
        <span onClick={this.skip}><button>NEXT</button></span>
        <p>Bridgd</p>
        <Player />
        <Queue />
        <SearchBar />
      </div>
    )
  }

})

module.exports = App;