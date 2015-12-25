import React, {Component} from 'react';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
const FontIcon = require('material-ui/lib/font-icon');

import QueueStore from '../stores/queue-store.js';
//import {loadVideo, deleteVideo } from '../actions/queue-actions.js';

class QueueClass extends Component{
  constructor(props){
    super(props)
  } 

  loadVideo(name, vid){
    this.props.loadVideo(name, vid)
  }

  // deleteVideo:(name, vd){
  //   deleteVideo(name, vid)
  // }

  getClass(vid){
    if(this.props.videoQueue && this.props.current && this.props.current.id.videoId == vid.id.videoId){
      return ' highlight-current'
    }
    return null
  }


  getQueue(){
    const loadVideo = this.loadVideo.bind(this)
    const getClass = this.getClass.bind(this)

    let name = this.props.name
    return(
      this.props.videoQueue.map((vid, i) => {
      return(
        <ListItem 
          key={vid.id.videoId}
          primaryText={<div className={getClass(vid)}>{vid.snippet.title}</div>}
          leftIcon={<i className="material-icons hvr-fade"  onClick={() => loadVideo(name, vid)}>play_arrows</i>}/>
          //rightIcon={<i className="material-icons hvr-fade" onClick={self.deleteVideo.bind(null, name, vid)}>delete</i>}/>
      )
      })
    )
  }

  render(){
    if(!this.props.videoQueue){
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
}



export default QueueClass;

