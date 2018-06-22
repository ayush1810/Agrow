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

import history from './history.js';

import SignupModel from './User/UserAdd.jsx';
import LoginModel from './User/UserLogin.jsx';
import AdminDB from './components/Admin/Admin.jsx';
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
                    <LoginModel loginUser={this.props.doLogin}/>
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
                  <Link to="/home" className="btn btn-light nav-link" onClick={this.props.signOut}>
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
      user : null
    }
    this.authenticate = this.authenticate.bind(this);
    this.signout = this.signout.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }
    
  loginUser(usercreds){
    fetch('/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(usercreds),
    }).then(response => response.json()).then(updatedUser => {
        this.authenticate();
        this.setState({user: updatedUser });
        history.push({
         pathname:'/dashboard',
        });
    }).catch(err =>{
        console.log(err.message);
    });
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
          <NavHead loggedIn={this.state.isAuthenticated} signOut={this.signout} doLogin={this.loginUser}  />
      <Route exact path='/home' component={HomePage} />
      <Route path='/dashboard' render={(props)=>
        this.state.isAuthenticated ? (<UsersInfo {...props} signout={this.signout} user={this.state.user} />)
         : ( <Redirect to={{ pathname: '/home', state : {from : props.location}}}/>) 
      }/>
      <Route path='/user/:username' component={UsersInfo} />
      <Route path='/admin' component={AdminDB}/>
      <Route path='/lol' component={noMatch} />
    </div>    
   </Router>   
    );
  }
}

ReactDOM.render(<Main/>, contentNode);