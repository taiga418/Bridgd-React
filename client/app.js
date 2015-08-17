import React from 'react';
import Router from 'react-router';
import App from './components/index.js';
let {Route, Link, State, RouteHandler, DefaultRoute} = Router;

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>,  document.getElementById("app"));
});

//React.render(new App({}),  document.getElementById("app"));