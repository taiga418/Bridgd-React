import React from 'react';
import RaisedButton  from 'material-ui/lib/raised-button'

var NavBar = React.createClass({

  render: function(){
    const {onSkip} = this.props;
    return(

      <header>
        <h1><strong className="brand">Bridgd</strong></h1>
        <RaisedButton className="tabs" label="Skip" onClick={onSkip}/>
      </header>
    )
  }

})

export default NavBar


