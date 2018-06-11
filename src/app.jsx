import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router, //Use BrowserRouter for HTML5 History API
    Route,
    Switch
} from 'react-router-dom'; 
import ItemList from './ItemList.jsx';
import UsersInfo from './signUp.jsx';

const contentNode = document.getElementById('contents');
const noMatch = () =><p>Page Not Found</p>;

const RoutedApp = () => (
  <Router>
    <Switch>
        <Route exact path='/' component={ItemList} />
        <Route exact path='/adduser' component={UsersInfo} />
        <Route exact path='*' component={noMatch} />
    </Switch>    
  </Router>  
);
ReactDOM.render(<RoutedApp />, contentNode);