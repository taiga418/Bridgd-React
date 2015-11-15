
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

var NavBar = React.createClass({

  render: function(){
    const {onSkip} = this.props;
    return(
      <AppBar
       title="Bridgd"
       style={{backgroundColor: '#2098d1'}}
        iconElementRight={<RaisedButton className="tabs" label="Skip" onClick={onSkip}/>} />
    )
  }

})

export default NavBar



