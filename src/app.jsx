import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router, //Use BrowserRouter for HTML5 History API
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'; 
import {
  Container, Row, Col,Collapse,
  Navbar,NavbarToggler,NavbarBrand,
  Nav,NavItem,NavLink,
  Button
} from 'reactstrap';

import createHistory from "history/createHashHistory";
const history = createHistory();  

import SignupModel from './User/UserAdd.jsx';
import LoginModel from './User/UserLogin.jsx';
import UsersInfo from './User/UserDashboard.jsx';
import HomePage from './Home.jsx';

const contentNode = document.getElementById('contents');

class NavHead extends React.Component {
  constructor(props,context){
    super(props,context);
    this.state ={
      isActive: false,
    };
    this.doToggle = this.doToggle.bind(this);
  }

  doToggle(){
    this.setState({isActive: !this.state.isActive});
  }

  render(){
  if (!this.props.loggedIn){
    return(
      <Navbar className="bg-transparent" expand="md">
        {/* <NavbarBrand href="#/">AGROW</NavbarBrand> */}
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink className="text-white" href="#dashboard"> Dashboard</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="text-white" href="http://github.com/ayush1810/agrow">Github</NavLink>
            </NavItem>
        </Nav>
        <NavbarToggler onClick={this.doToggle}/>
        <Collapse isOpen={this.state.isActive} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <LoginModel authenticate={this.props.authenticate}/>
                </NavItem>
                <NavItem className="ml-2">
                    <SignupModel/>
                </NavItem>
            </Nav>
        </Collapse>
      </Navbar>
    );
  }
  else {
    return(
      <Navbar className="bg-transparent" expand="md">
        {/* <NavbarBrand href="#/">AGROW</NavbarBrand> */}
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink className="text-white" href="#home">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="text-white" href="http://github.com/ayush1810/agrow">Github</NavLink>
            </NavItem>
        </Nav>
        <NavbarToggler onClick={this.doToggle}/>
        <Collapse isOpen={this.state.isActive} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="#home" className="bt-primary nav-link" onClick={this.props.signOut}>
							        Logout
                  </Link>
                </NavItem>
            </Nav>
        </Collapse>
      </Navbar>
    );
  }
} 
}

const noMatch = ({match}) =>{
  return(
    <h2> Welcome, {match.params.name}</h2>
  );
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
    }
    this.authenticate = this.authenticate.bind(this);
    this.signout = this.signout.bind(this);
  }
  authenticate(){
    this.setState({isAuthenticated:true});
  }
  signout(){
    this.setState({isAuthenticated:false});
  }
  
render(){
    return(
      <Router>
        <div>
          <NavHead loggedIn={this.state.isAuthenticated} signOut={this.signout} authenticate={this.authenticate}   />
      <Route exact path='/home' component={HomePage} />
      <Route path='/dashboard' render={(props)=>
        this.state.isAuthenticated ? (<UsersInfo {...props} signout={this.signout} />) : (
        <Redirect 
          to={{
            pathname: '/',
            state : {from : props.location}
          }}
        />
      ) 
      }/>
      <Route path='/user/:username' component={UsersInfo} />
      <Route exact path='/lol/:name' component={noMatch} />
     
    </div>    
   </Router>   
    );
  }
}

ReactDOM.render(<Main/>, contentNode);