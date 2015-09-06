import React from 'react';
import $ from 'jquery';
import PlayerStore from '../stores/player-store.js';
import QueueStore from '../stores/queue-store.js';
import Actions from '../actions/actions.js';

var SearchBarClass = React.createClass({
  getInitialState: function(){
    return {
      results : null
    }
  },

  componentDidMount: function(){

  },

  componentWillUnmount: function(){

  },

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
      console.log(this.state.results)
      return(
        <div>
          {this.state.results.map(function(item){
            return (
              <div onClick={this.queueVideo.bind(null, item)}>
                <h4>{item.snippet.title}</h4>
                <p>id : {item.id.videoId}</p> 
                <img src={item.snippet.thumbnails.default.url}/>
              </div>   
            ) 
            
          }.bind(this))}
        </div>
      )
    }else if(this.state.results && this.state.results.length == 0){
      return(
        <div>No results</div>
      )
    }else{
      return(
        <div>Nothing</div>
      )
    }
  },


  // loadVideo: function(id){
  //   Actions.loadVideo(id)
  // },

  queueVideo: function(vid){
    Actions.enqueueVideo(vid);
  },

  render: function(){
    return(
      <div>
        <input onChange={this.search} />
        {this.showResults()}
      </div>
    )
  } 
})

module.exports = SearchBarClass; 