import React from 'react';
import $ from 'jquery';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Snackbar from 'material-ui/lib/snackbar';

import PlayerStore from '../stores/player-store.js';
import QueueStore from '../stores/queue-store.js';
import {enqueueVideo} from '../actions/actions.js';

var SearchBarClass = React.createClass({
  getInitialState: function(){
    return {
      results : null
    }
  },

  //put logic into store or index.js
  search: function(e){
    var self = this;
    var query = e.target.value;
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
        self.setState({results: data.items})
      })
    }
   
  },

  showResults: function(e){
    var self = this;
    if(this.state.results){
      return(
        <div>
          {this.state.results.map(function(item){
            return(
              <ListItem
                key={item.id.videoId}
                leftIcon={<img src={item.snippet.thumbnails.default.url} />}
                primaryText={item.snippet.title}
                secondaryText={item.snippet.channelTitle}
                secondaryTextLines={2} 
                onClick={this.queueVideo.bind(null, item)}/>
            )
          }.bind(this))}
        </div>
      )
    }else if(this.state.results && this.state.results.length == 0){
      return(
        <div>No results</div>
      )
    }
  },

  //put logic into store or index.js
  queueVideo: function(vid){
    var videos = QueueStore.getQueueState().videos;
    var dupe = videos.filter(obj => {
      return obj.id.videoId == vid.id.videoId
    });
   
    if(dupe.length ==  0){
      console.log('Added')
      enqueueVideo(vid);
    }else{
     this.refs.dupe.show();
    }
  },

  closeSnackBar: function(){
    this.refs.dupe.dismiss();
  },

  clearResult: function(){
    this.setState({results: null})
  },

  render: function(){
    const {results} = this.state;
    return(
      <div className="results">
        <TextField hintText="Search for Videos" className="search-field" onChange={this.search}/>
        {results && <i className="material-icons" onClick={this.clearResult}>keyboard_arrow_up</i>}
        <div className="results-container">
          <List>
            {this.showResults()}
          </List>
        </div>
        <Snackbar
          ref="dupe"
          message="Video is already in the queue!"
          action="close"
          onActionTouchTap={this.closeSnackBar}
          autoHideDuration={3000} />
      </div>
    )
  } 
})

module.exports = SearchBarClass; 