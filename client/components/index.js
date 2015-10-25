import React from 'react';
import _ from 'underscore'


import Actions from '../actions/actions.js'

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
      Actions.socketUpdate(queue);
    })

    this.socket.on('loadVideo', function(vid){
      console.log('update')
      Actions.loadVideo(vid.id.videoId)
    })
  },

  skip: function(){
    var state = QueueStore.getQueueState();
    var videos = state.videos;
    var currentVidObj = _.find(videos, function(vid){
      return vid.id.videoId == state.currentId
    })
    var currentIndex = videos.indexOf(currentVidObj) 
    if(currentIndex == videos.length - 1){
      currentIndex = -1;
    }
    console.log(currentIndex, videos[currentIndex + 1], videos)
    Actions.loadVideo(videos[currentIndex + 1].id.videoId);
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