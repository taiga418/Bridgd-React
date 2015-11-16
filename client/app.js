import React from 'react';
import ReactDOM from 'react-dom'
//import Router from 'react-router';
import Landing from './components/index.js';
//let {Route, Link, State, RouteHandler, DefaultRoute} = Router;

class App extends React.Component{

  render (){
    return(
      <div>
        <Landing />
      </div>
    )
  }

}

// var routes = (
//   <RouteHandler handler={App}>
//     <DefaultRoute handler={Landing} />
//     <Route name="landing" path="/" handler={Landing} />
//   </RouteHandler>
// );

//Router.run(routes, function (Handler) {
  ReactDOM.render(<App/>,  document.getElementById("app"));
//});

module.exports = App;