import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import LobbyStore from './stores/lobby-store'

import {submitLogin} from './actions/lobby-actions'

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

  render (){
    let{state, handleInputChange, handleSubmitLogin} = this;

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
          <TextField hintText="Room name" className="search-field" value={newName} onChange={this.handleInputChange.bind(this, 'loginForm', 'name')}/>
          <TextField hintText="Password" className="search-field" value={newPassword} onChange={this.handleInputChange.bind(this, 'loginForm', 'password')}/>
          <TextField hintText="Password Confirmation" className="search-field" value={password} onChange={this.handleInputChange.bind(this, 'loginForm', 'password')}/>
          <RaisedButton label="Go!"></RaisedButton>
        </div>
      )
    }
   
  }

}

ReactDOM.render(<Lobby/>, document.getElementById("lobby"));

module.exports = Lobby;