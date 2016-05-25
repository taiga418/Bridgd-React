import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from './login';
import Main from './main';
import Create from './create';

export default (
<Router history={browserHistory}>
  <Route path="/" component={Main}/>
  <Route path="/lobby" component={Login} />
  <Route path="/create" component={Login} />
</Router>);
