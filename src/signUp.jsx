import React from 'react';

export default class AddUser extends React.Component{
    constructor()
    {
        super();
        this.addUser = this.addUser.bind(this);
        this.state = {
            sellers: []
        };
    }

    addUser(e){
        e.preventDefault(); 
        let form = document.forms.addUserForm; 
        console.log("Hmmm");
    }

    render(){
        return(
            <div>
                <h2>SignUp as a new Seller.</h2>
                <form name="addUserForm" onSubmit="addUser">
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="location" placeholder="Location"/>
                    <button type="submit">SignUp</button>
                </form>
            </div>
        );
    }
}