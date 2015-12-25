import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppReducer from './reducers/app-reducer'

import Landing from './components/index.js';




const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore)

const AppStore = createStoreWithMiddleware(AppReducer)

export default class App extends Component{

  render (){
    return(
      <div>
        <Landing />
      </div>
    )
  }

}

ReactDOM.render(
  <Provider store={AppStore}>
    <App/>
  </Provider>
  ,  document.getElementById("app"));
