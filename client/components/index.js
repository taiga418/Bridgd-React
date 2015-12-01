import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'
import $ from 'jquery';

import {socketUpdate, loadVideo, signOut, enqueueVideo} from '../actions/queue-actions.js'

import QueueStore from '../stores/queue-store.js';
import PlayerStore from '../stores/player-store.js';

import NavBar from './navbar.js'
import Player from './player.js'
import SearchBar from './search-bar.js'
import Queue from './queue.js'

injectTapEventPlugin();

//Main Landing Page of the App, houses all components. View Controller 
var App = React.createClass({

  getInitialState: function(){
    return {
      results: null,
      showResults: true
    }
  },

  componentDidMount: function(){
    this.socket = io();
    this.socket.emit('joined', window.room._id);

    this.socket.on('queueUpdate', function(queue){
      socketUpdate(queue);
    })

    this.socket.on('loadVideo', function(vid){
      loadVideo(vid)
    })
  },

  loadNext: function(){
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
  },

  signOut: function(){
    signOut()
  },

  queueVideo: function(vid, callback){
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
  },

  search: function(e){
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
  },

  hideResults: function(){
    this.setState({showResults: false});
  },


  render: function(){
    let{loadNext, signOut, hideResults, queueVideo, search, state} = this;
    let{results,showResults} = state;
    return(
      <div className="container">
        <NavBar className="nav" onSkip={loadNext} onSignOut={signOut}/>
        <div className="left-content">
          <Player next={loadNext}/>
          <SearchBar onQueueVideo={queueVideo} onSearch={search} onHideResults={hideResults} {...{results, showResults}}/>
        </div>
        <div className="right-content">
          <Queue/>
        </div>
      </div>
    )
  }

})

module.exports = App;