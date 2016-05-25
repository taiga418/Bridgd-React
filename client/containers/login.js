import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';
import {connect} from 'react-redux';
//import {Provider} from 'react-redux';
//import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

//import LobbyReducer from '../reducers/lobby-reducer';
import * as actionCreators from '../actions/lobby-actions';
import LoginForm from '../forms/login-form';

function mapStateToProps(state) {
  const {lobby} = state;
  return {
    active: lobby.get('active'),
    loading: lobby.get('loading'),
    error: lobby.get('error'),
  }
}

class Lobby extends Component{

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
    const{ active, loading, error} = this.props;
    let{state, handleInputChange, handleSubmitLogin, handlSubmitCreate, toggleForm} = this;

    let {name, password} = state.loginForm;
    let {newName, newPassword, passwordConfirmation} = state.createForm;

    handleSubmitLogin = handleSubmitLogin.bind(this);
    handlSubmitCreate = handlSubmitCreate.bind(this);

    //TODO: Redux forms? or form solution wired to redux
    let disabled, passwordCheck;
    if(!newName || !newPassword || !passwordConfirmation){
      disabled = true
    }else if(newPassword != passwordConfirmation){
      passwordCheck = true
    }

    if(loading){
      return(
        <div className="loading">
          Please Wait
          <LinearProgress mode="indeterminate"  />
        </div>
      )
    }
    if(active == 'login'){
      return <LoginForm />
    }
    if(active == 'new'){
      return <CreateForm />
    }
  }

}
const Container = connect(mapStateToProps, actionCreators)(Lobby)
export default Container;
