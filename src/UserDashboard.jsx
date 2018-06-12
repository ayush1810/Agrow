import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import Webhead from './Header.jsx';

export default class UsersInfo extends React.Component{
    render(){
        return(
            <div>
                <Webhead/> 
                <hr/> 
                <h3> Users Dashboard coming soon!</h3>
                <Button bsStyle="success" bsSize="small"><Glyphicon glyph="plus"/></Button>
            </div>
        );
    }
}