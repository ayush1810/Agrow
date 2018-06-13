import React from 'react';
import Webhead from '../Header.jsx';

import ItemTable from './MyItems/ItemList.jsx';

export default class UsersInfo extends React.Component{
    constructor(props, context){
        super(props,context);
        this.state = {
            username: 'User'
        };
    }
    render(){
        return(
            <div>
                <Webhead/> 
                <hr/> 
                <p>
                    Welcome {this.state.username}
                </p>
                <div>
                    <ItemTable/>
                </div>
            </div>
        );
    }
}