import React from 'react';

var NavBar = React.createClass({

  render: function(){
    const {onSkip} = this.props
    return(
      <header>
        <h1><strong className="brand">Bridgd</strong></h1>
        <div className="tabs" onClick={onSkip}>SKIP</div>
      </header>
    )
  }

})

export default NavBar


