import React from 'react';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Snackbar from 'material-ui/lib/snackbar';


var SearchBarClass = React.createClass({

  showResults: function(onQueueVideo, results, e){
    var self = this;
    if(results.length > 0){
      return(
        <div>
          {results.map(function(item){
            return(
              <ListItem
                key={item.id.videoId}
                leftIcon={<img src={item.snippet.thumbnails.default.url} />}
                primaryText={item.snippet.title}
                secondaryText={item.snippet.channelTitle}
                secondaryTextLines={2} 
                onClick={()=> {onQueueVideo(item, ()=>{this.refs.dupe.show()})}}/>
            )
          }.bind(this))}
        </div>
      )
    }else{
      return(
        <div>No results</div>
      )
    }
  },

  closeSnackBar: function(){
    this.refs.dupe.dismiss();
  },

  render: function(){
    const {onQueueVideo, onSearch, onHideResults, results, showResults} = this.props;
    return(
      <div className="results">
        <TextField hintText="Search for Videos" className="search-field" onChange={onSearch}/>
        {results && <i className="material-icons" onClick={onHideResults}>keyboard_arrow_up</i>}
        <div className="results-container">
          {(showResults && results) && <List>{this.showResults(onQueueVideo, results)}</List>}
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