import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
const FontIcon = require('material-ui/lib/font-icon');

import QueueStore from '../stores/queue-store.js';
import {loadVideo, deleteVideo } from '../actions/actions.js';

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

  loadVideo: function(vid){
    if(this.state.videoQueue.current.id.videoId != vid.id.videoId){
      loadVideo(vid)
    }
  },

  deleteVideo: function(vid){
    deleteVideo(vid)
  },

  getClass: function(vid){
    let ret = 'item';
    if(this.state.videoQueue && this.state.videoQueue.current.id.videoId == vid.id.videoId){
      ret+=' highlight-current'
    }
    return ret;
  },


  getQueue: function(){
    var self = this;
    return(
      this.state.videoQueue.videos.map((vid, i) => {
      return(
        <ListItem 
          key={vid.id.videoId}
          className={self.getClass(vid)}
          primaryText={vid.snippet.title}
          leftIcon={<i className="material-icons hvr-fade"  onClick={self.loadVideo.bind(null, vid)}>play_arrows</i>}
          rightIcon={<i className="material-icons hvr-fade" onClick={self.deleteVideo.bind(null, vid)}>delete</i>}/>
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

