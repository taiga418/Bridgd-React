import React from 'react';

import {socketUpdate, loadVideo} from '../actions/actions.js'

import QueueStore from '../stores/queue-store.js';
import PlayerStore from '../stores/player-store.js';

import NavBar from './navbar.js'
import Player from './player.js'
import SearchBar from './search-bar.js'
import Queue from './queue.js'

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
    let state = QueueStore.getQueueState();
    let {videos} = state;
    let currentVidObj = videos.find(vid => {
      return vid.id.videoId == state.current.id.videoId
    })
    let currentIndex = videos.indexOf(currentVidObj)
    
    if(currentIndex == videos.length - 1){
      currentIndex = -1;
    }
    loadVideo(videos[currentIndex + 1]);
  },

  render: function(){
    return(
      <div>
        <NavBar onSkip={this.skip}/>
        <div className="left-content">
          <Player />
          <SearchBar />
        </div>
        <div className="right-content">
          <Queue />
        </div>
      </div>
    )
  }

})

module.exports = App;