import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
const FontIcon = require('material-ui/lib/font-icon');

import QueueStore from '../stores/queue-store.js';
import {loadVideo, deleteVideo } from '../actions/queue-actions.js';

var QueueClass = React.createClass({
  getInitialState: function(){
    return {
      videoQueue : QueueStore.getQueueState()
    }
  },

  _onChange: function(){
    this.setState({videoQueue: QueueStore.getQueueState()})
  },

  componentDidMount: function(){
    QueueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    QueueStore.removeChangeListener(this._onChange);
  },

  loadVideo: function(name, vid){
    if(this.state.videoQueue.current.id.videoId != vid.id.videoId){
      loadVideo(name, vid)
    }
  },

  deleteVideo: function(name, vid){
    deleteVideo(name, vid)
  },

  getClass: function(vid){
    if(this.state.videoQueue && this.state.videoQueue.current.id.videoId == vid.id.videoId){
      return ' highlight-current'
    }
    return null
  },


  getQueue: function(){
    let self = this;
    let name = this.state.videoQueue.name
    return(
      this.state.videoQueue.videos.map((vid, i) => {
      return(
        <ListItem 
          key={vid.id.videoId}
          primaryText={<div className={self.getClass(vid)}>{vid.snippet.title}</div>}
          leftIcon={<i className="material-icons hvr-fade"  onClick={self.loadVideo.bind(null, name, vid)}>play_arrows</i>}
          rightIcon={<i className="material-icons hvr-fade" onClick={self.deleteVideo.bind(null, name, vid)}>delete</i>}/>
      )
      })
    )
  },

  render: function(){
    if(!this.state.videoQueue){
      return(<div>Loading...</div>)
    }
    return(
      <div className="queue">
        <List subheader="Queue">
          <ListDivider />
          {this.getQueue()}
        </List>
      </div>
    )
  }
})



export default QueueClass;

