import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router, //Use BrowserRouter for HTML5 History API
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'; 

import UsersInfo from './User/UserDashboard.jsx';
import Webhead from './Header.jsx';

const contentNode = document.getElementById('contents');
const noMatch = ({match}) =>{
  return(
    <h2> Welcome, {match.params.name}</h2>
  );
}

const fakeAuth = {
  isAuthenticated: true,
  authenticate(){
    this.isAuthenticated = true;
  },
  signout(){
    this.isAuthenticated = false;
  }
}

class Main extends React.Component{
  render(){
    return(
      <div className="containerFluid">
        <Webhead/>
        Welcome to the homepage. 
        Login or Signup to trade!
      </div>
    );
  }
}

const RoutedApp = () => (
  <Router>
    <Switch>
        <Route exact path='/home' component={Main} />
        <Route path='/dashboard'     render={(props) =>
          fakeAuth.isAuthenticated ? (<UsersInfo/>) 
                                   : (<Redirect to={{ pathname: "/home",state: { from: props.location }}}/>)
        }/>
        <Route path='/user/:username' component={UsersInfo} />
        <Route exact path='/lol/:name' component={noMatch} />
    </Switch>    
  </Router>  
);
ReactDOM.render(<RoutedApp />, contentNode);