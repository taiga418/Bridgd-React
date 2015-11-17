import React from 'react';
import ReactDOM from 'react-dom'

class Lobby extends React.Component{

  render (){
    return(
      <div>
       HI
      </div>
    )
  }

}


ReactDOM.render(<Lobby/>,  document.getElementById("lobby"));

module.exports = Lobby;