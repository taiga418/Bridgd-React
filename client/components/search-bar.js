import React, {Component} from 'react';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Snackbar from 'material-ui/lib/snackbar';


class SearchBarClass extends Component{

  showResults(onQueueVideo, results){
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
  }

  closeSnackBar(){
    this.refs.dupe.dismiss();
  }

  onSearch(e){
    let query = e.target.value;
    if(query.length > 2){
      this.props.searchAPI(query)
    }

  }

  render(){
    const {enqueueVideo, results, onHideResults} = this.props;
    const onSearch = this.onSearch.bind(this)
    return(
      <div className="results">
        <TextField hintText="Search for Videos" className="search-field" onChange={(e) => onSearch(e)}/>
        {results && <i className="material-icons" onClick={onHideResults}>keyboard_arrow_up</i>}
        <div className="results-container">
          {results && <List>{this.showResults(enqueueVideo, results)}</List>}
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
}

module.exports = SearchBarClass; 