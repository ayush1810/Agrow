import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import indexRoutes from "./routes.jsx";

import "./assets/scss/material-kit-react.css?v=1.1.0";

var hist = createBrowserHistory();

const AppRouter = (props) => {
  return(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>
  );
}

ReactDOM.render(
  <AppRouter/>,
  document.getElementById("root")
);

// if(module.hot){
//   module.hot.accept();
// }