import React from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';

//import LobbyStore from './stores/lobby-store'

//import {submitLogin, createRoom, toggleForm} from './actions/lobby-actions'

////
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import LobbyReducer from './reducers/lobby-reducer'
import {connect} from 'react-redux'
import * as actionCreators from './actions/lobby-actions'

function mapStateToProps(state) {
  const {lobby, create} = state;
  return {
    lobby,
    create
  }
}

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore)

const LobbyStore = createStoreWithMiddleware(LobbyReducer)

class Lobby extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      loginForm: {},
      createForm: {},
    }
  }

  handleInputChange(form, field, e) {
    let f = this.state[form];
    let copyForm = Object.assign({}, f)
    copyForm[field] = e.target.value;
    this.setState({[form]: copyForm});
  }

  handleSubmitLogin(e){
    e.preventDefault()
    this.props.submitLogin(this.state.loginForm)
  }

  handlSubmitCreate(e){
    e.preventDefault()
    let room = this.state.createForm;
    this.props.submitNew(room)
  }

  toggleForm(form){
    this.props.toggleForm(form);
  }

  render (){
    const{lobby} = this.props;

    const active = lobby.get('active');
    const loading = lobby.get('loading');
    const error = lobby.get('error');

    let{state, handleInputChange, handleSubmitLogin, handlSubmitCreate, toggleForm} = this;

    let {name, password} = state.loginForm;
    let {newName, newPassword, passwordConfirmation} = state.createForm;

    handleSubmitLogin = handleSubmitLogin.bind(this);
    handlSubmitCreate = handlSubmitCreate.bind(this);

    if(loading){
      return(
        <div className="loading">
          Please Wait
          <LinearProgress mode="indeterminate"  /> 
        </div>
      )
    }

    if(active == 'login'){
      return(
        <div>
          <div className="pen-title">
            <h1>Bridgd</h1>
          </div>
          <div className="module form-module">
            <div className="toggle" onClick={()=>toggleForm.call(this, 'new')}>
              <i className="material-icons">add_box</i>
              <div className="tooltip">New</div>
            </div>
            <div className="form">
              <h2>Login to a room</h2>
              <form>
                <input type="text" placeholder="Room Name" value={name} onChange={handleInputChange.bind(this, 'loginForm', 'name')}/>
                <input type="password" placeholder="Password" value={password} onChange={handleInputChange.bind(this, 'loginForm', 'password')}/>
                <button  disabled={loading} onClick={(e) => {handleSubmitLogin(e)}}>Login</button>
                {error && <div className="error-text">Invalid Credentials</div>}
              </form>
            </div>
          </div>
        </div>
      )
    }
    if(active == 'new'){
      return(
        <div>
          <div className="pen-title">
            <h1>Bridgd</h1>
          </div>
          <div className="module form-module">
            <div className="toggle" onClick={toggleForm.bind(this, 'login')}>
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
                {error && <div className="error-text">Server Error, please try again</div>}
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

}

const Container = connect(mapStateToProps, actionCreators)(Lobby)
ReactDOM.render(
  <Provider store={LobbyStore}>
    <Container/>
  </Provider>,
  document.getElementById("lobby"));
export default Lobby;


