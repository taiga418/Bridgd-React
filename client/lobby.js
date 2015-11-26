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

  handlSubmitCreate(){
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
              <i className="material-icons">plus-box</i>
              <div className="tooltip">Click Me</div>
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
              <i className="material-icons">plus-box</i>
              <div className="tooltip">Click Me</div>
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
    // <div className="form">
    //         <h2>Create an account</h2>
    //         <form>
    //           <input type="text" placeholder="Username"/>
    //           <input type="password" placeholder="Password"/>
    //           <input type="email" placeholder="Email Address"/>
    //           <input type="tel" placeholder="Phone Number"/>
    //           <button>Register</button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // if(active == 'loginForm'){
    //   return(
    //     <div>
    //       {(loading) && <div>Loading</div>}
    //       {(error) && <div>Incorrect lobby creds</div>}
    //       <TextField hintText="Room name" className="search-field" value={name} onChange={handleInputChange.bind(this, 'loginForm', 'name')}/>
    //       <TextField hintText="Password" className="search-field" value={password} onChange={handleInputChange.bind(this, 'loginForm', 'password')}/>
    //       <RaisedButton label="Go!" onClick={handleSubmitLogin.bind(this)}></RaisedButton>
    //     </div>
    //   )
    // }
    // if(active == 'createForm'){
    //   return(
    //     <div>
    //       <TextField hintText="Room name" className="search-field" value={newName} onChange={handleInputChange.bind(this, 'createForm', 'newName')}/>
    //       <TextField hintText="Password" className="search-field" value={newPassword} onChange={handleInputChange.bind(this, 'createForm', 'newPassword')}/>
    //       <TextField hintText="Password Confirmation" className="search-field" value={passwordConfirmation} onChange={handleInputChange.bind(this, 'createForm', 'passwordConfirmation')}/>
    //       <RaisedButton label="Go!" onClick={handlSubmitCreate.bind(this)}></RaisedButton>
    //     </div>
    //   )
    // }
   
  }

}

ReactDOM.render(<Lobby/>, document.getElementById("lobby"));

module.exports = Lobby;