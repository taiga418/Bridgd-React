import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import LobbyStore from './stores/lobby-store'

import {submitLogin, createRoom} from './actions/lobby-actions'

class Lobby extends React.Component{

  constructor(){
    super()
    this.state = {
      loginForm: {},
      createForm: {},
      lobbyState: LobbyStore.getLobbyState()
    }
  }

  componentDidMount(){
    LobbyStore.addChangeListener(this._onChange.bind(this));
  }

  _onChange(){
    this.setState({lobby: LobbyStore.getLobbyState()})
  }

  handleInputChange(form, field, e) {
    let f = this.state[form];
    let copyForm = Object.assign({}, f)
    copyForm[field] = e.target.value;
    this.setState({[form]: copyForm});
  }

  handleSubmitLogin(){
    submitLogin(this.state.loginForm)
  }

  handlSubmitCreate(){
    let room = this.state.createForm;
    if(room.newPassword == room.passwordConfirmation){
      let data = {name: room.newName, password: room.newPassword}
      createRoom(data)
    }
  }

  render (){
    let{state, handleInputChange, handleSubmitLogin, handlSubmitCreate} = this;

    let{loading, error, active} = state.lobbyState;

    let {name, password} = state.loginForm;
    let {newName, newPassword, passwordConfirmation} = state.createForm;

    if(active == 'loginForm'){
      return(
        <div>
          {(loading) && <div>Loading</div>}
          {(error) && <div>Incorrect lobby creds</div>}
          <TextField hintText="Room name" className="search-field" value={name} onChange={handleInputChange.bind(this, 'loginForm', 'name')}/>
          <TextField hintText="Password" className="search-field" value={password} onChange={handleInputChange.bind(this, 'loginForm', 'password')}/>
          <RaisedButton label="Go!" onClick={handleSubmitLogin.bind(this)}></RaisedButton>
        </div>
      )
    }
    if(active == 'createForm'){
      return(
        <div>
          <TextField hintText="Room name" className="search-field" value={newName} onChange={handleInputChange.bind(this, 'createForm', 'newName')}/>
          <TextField hintText="Password" className="search-field" value={newPassword} onChange={handleInputChange.bind(this, 'createForm', 'newPassword')}/>
          <TextField hintText="Password Confirmation" className="search-field" value={passwordConfirmation} onChange={handleInputChange.bind(this, 'createForm', 'passwordConfirmation')}/>
          <RaisedButton label="Go!" onClick={handlSubmitCreate.bind(this)}></RaisedButton>
        </div>
      )
    }
   
  }

}

ReactDOM.render(<Lobby/>, document.getElementById("lobby"));

module.exports = Lobby;