import React from 'react';
import Router from 'react-router';
import Landing from './components/index.js';
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
    <DefaultRoute handler={Landing} />
    <Route name="landing" path="/" handler={Landing} />
  </RouteHandler>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>,  document.getElementById("app"));
});

module.exports = App;