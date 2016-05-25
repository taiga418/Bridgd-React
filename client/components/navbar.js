
import React, {Component} from 'react';
import FlatButton from 'material-ui/lib/raised-button';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Toggle from 'material-ui/lib/toggle';

class NavBar extends Component{

  onShuffle(val){
    this.props.shuffle(val)
  }

  render(){
    const {loadNext, signOut, shuffleQueue, name} = this.props;
    const shuffleMode = !!shuffleQueue
    const color =  shuffleMode?  '#74EA81' : "#FFFFFF"
    const style={"font-family": "Roboto, sans-serif", "color":"#FFFFFF"}

    return(
      <Toolbar
        style={{backgroundColor: '#2098d1'}}>
        <ToolbarGroup float="left">
           <IconMenu iconButtonElement={
              <IconButton><i className="material-icons">menu</i></IconButton>
            }
            openDirection="bottom-right">
              <MenuItem primaryText="Sign out" onClick={signOut}/>
            </IconMenu>
        </ToolbarGroup>
        <ToolbarGroup float="left">
          <ToolbarTitle  {...{style}} text={name}/>
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <IconButton
            style={{color}} tooltip="shuffle" onClick={this.onShuffle.bind(this, !shuffleMode)}><i className="material-icons">shuffle</i></IconButton>
          <IconButton
            style={{color: '#FFFFFF'}} tooltip="skip" onClick={loadNext}><i className="material-icons">skip_next</i></IconButton>
        </ToolbarGroup>

       </Toolbar>


    )
  }

}

export default NavBar
