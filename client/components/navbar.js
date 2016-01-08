
import React from 'react';
import FlatButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item'; 

var NavBar = React.createClass({

  render: function(){
    const {loadNext, signOut} = this.props;
    return(
      <AppBar
        title="Bridgd"
        style={{backgroundColor: '#2098d1'}}
        iconElementRight={<FlatButton className="tabs" label="Skip" onClick={loadNext}/>}
        iconElementLeft={
          <IconMenu iconButtonElement={
            <IconButton><i className="material-icons">menu</i></IconButton>
          }
          openDirection="bottom-right">
            <MenuItem primaryText="Sign out" onClick={signOut}/>
          </IconMenu>
        } /> 
        
      
    )
  }

})

export default NavBar



