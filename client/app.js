import React from 'react';
import Router from 'react-router';
import Landing from './components/index.js';
import Main from './components/main.js';
let {Route, Link, State, RouteHandler, DefaultRoute} = Router;

class App extends React.Component{

  render (){
    return(
      <div>
        <RouteHandler />
      </div>
    )
  }

}

var routes = (
  <RouteHandler handler={App}>
    <Route name="app" path="/app" handler={Landing} />
    <Route name="main" path="/main" handler={Main} />
  </RouteHandler>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>,  document.getElementById("app"));
});

