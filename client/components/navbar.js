
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';

var NavBar = React.createClass({

  render: function(){
    const {onSkip} = this.props;
    return(
      <Toolbar>
        <RaisedButton className="tabs" label="Skip" onClick={onSkip}/>
      </Toolbar>
    )
  }

})

export default NavBar



