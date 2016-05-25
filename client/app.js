import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as form } from 'redux-form';

import AppReducer from './reducers/app-reducer'
import Router from './containers/router';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore)

const reducers = combineReducers({...AppReducer, form})
const AppStore = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={AppStore}>
    {Router}
  </Provider>
  ,  document.getElementById("app"));
