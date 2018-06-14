import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router, //Use BrowserRouter for HTML5 History API
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'; 
import {Container, Row, Col} from 'reactstrap';

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
      <Container fluid>
        <Webhead/>
        <Container>
          <Row>
            <Col className="display-3 my-0 py-0 px-auto text-center" style={{color:'#25a55f'}}>AGROW</Col>
          </Row>
          <Row>
            <Col className="display-5 m-0 p-0 font-italic text-center" style={{color:'#fff7c2'}}>An experimental bidding project</Col>
          </Row>
        </Container>
      </Container>
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