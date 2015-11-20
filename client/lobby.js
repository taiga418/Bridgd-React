import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class Lobby extends React.Component{

  render (){
    return(
      <div>
       <TextField hintText="Room name" className="search-field" onChange={this.search}/>
       <TextField hintText="Password" className="search-field" onChange={this.search}/>
       <RaisedButton label="Go!"></RaisedButton>
      </div>
    )
  }

}


ReactDOM.render(<Lobby/>, document.getElementById("lobby"));

module.exports = Lobby;