
import React, {Component} from 'react';
import FlatButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item'; 
import Toggle from 'material-ui/lib/toggle';

class NavBar extends Component{

  onToggle(e,val){
    this.props.shuffle(val)
  }

  render(){
    const {loadNext, signOut, shuffleQueue} = this.props;
    let shuffleMode = !!shuffleQueue
    const onToggle = this.onToggle.bind(this)
    return(
      <AppBar
        title="Bridgd"
        style={{backgroundColor: '#2098d1'}}
        iconElementRight={
          <div>
            <FlatButton className="tabs" label="Skip" onClick={loadNext}/>
            <Toggle
              name="shuffleMode"
              value={shuffleMode}
              onToggle={(e,val) => onToggle(e,val)}
              label="Shuffle"/>
          </div>
        }
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

}

export default NavBar



