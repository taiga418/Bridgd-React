import React from 'react';
import ReactDOM from 'react-dom';

import LobbyStore from './stores/lobby-store'

import {submitLogin, createRoom} from './actions/lobby-actions'

class Lobby extends React.Component{

  constructor(){
    super()
    this.state = {
      loginForm: {},
      createForm: {},
      active:'loginForm',
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

  handleSubmitLogin(e){
    e.preventDefault()
    submitLogin(this.state.loginForm)
  }

  handlSubmitCreate(e){
    e.preventDefault()
    let room = this.state.createForm;
    if(room.newPassword == room.passwordConfirmation){
      let data = {name: room.newName, password: room.newPassword}
      createRoom(data)
    }
  }

  toggleForm(form){
    this.setState({active: form});
  }

  render (){
    let{state, handleInputChange, handleSubmitLogin, handlSubmitCreate, toggleForm} = this;

    let{loading, error} = state.lobbyState;
    let{active} = state;

    let {name, password} = state.loginForm;
    let {newName, newPassword, passwordConfirmation} = state.createForm;

    handleSubmitLogin = handleSubmitLogin.bind(this);
    handlSubmitCreate = handlSubmitCreate.bind(this);
    if(active == 'loginForm'){
      return(
        <div>
          <div className="pen-title">
            <h1>Bridgd</h1>
          </div>
          <div className="module form-module">
            <div className="toggle" onClick={toggleForm.bind(this, 'createForm')}>
              <i className="material-icons">add_box</i>
              <div className="tooltip">New</div>
            </div>
            <div className="form">
              <h2>Login to a room</h2>
              <form>
                <input type="text" placeholder="Room Name" value={name} onChange={handleInputChange.bind(this, 'loginForm', 'name')}/>
                <input type="password" placeholder="Password" value={password} onChange={handleInputChange.bind(this, 'loginForm', 'password')}/>
                <button  onClick={(e) => {handleSubmitLogin(e)}}>Login</button>
              </form>
            </div>
          </div>
        </div>
      )
    }
    if(active == 'createForm'){
      return(
        <div>
          <div className="pen-title">
            <h1>Bridgd</h1>
          </div>
          <div className="module form-module">
           <div className="toggle" onClick={toggleForm.bind(this, 'loginForm')}>
              <i className="material-icons">account_box</i>
              <div className="tooltip">Login</div>
            </div>
            <div className="form">
              <h2>Create a Room</h2>
              <form>
                <input type="text" placeholder="Room Name"  value={newName} onChange={handleInputChange.bind(this, 'createForm', 'newName')}/>
                <input type="password" placeholder="Password" value={newPassword} onChange={handleInputChange.bind(this, 'createForm', 'newPassword')}/>
                <input type="password" placeholder="Password Confirmation" value={passwordConfirmation} onChange={handleInputChange.bind(this, 'createForm', 'passwordConfirmation')}/>
                <button onClick={(e) => handlSubmitCreate(e)}>Register</button>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

}

ReactDOM.render(<Lobby/>, document.getElementById("lobby"));

module.exports = Lobby;