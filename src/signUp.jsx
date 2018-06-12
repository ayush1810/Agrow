import React from 'react';

import Webhead from './Header.jsx';

const UserRow = (props) => (
    <tr>
        <td >{props.item._id}</td>
        <td >{props.item.name}</td>
        <td >{props.item.email}</td>
        <td >{props.item.location}</td>
        <td >{props.item.rating}</td>
    </tr>   
)

function UserTable (props){
    const UserRows = props.users.map(item => <UserRow key={item._id} item={item}/>) ; 
    return(
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {UserRows}
            </tbody>
        </table>
        );
    }

class AddUser extends React.Component{
    constructor()
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createSeller = this.createSeller.bind(this);
    }

    handleSubmit(e){
        e.preventDefault(); 
        let form = document.forms.addUserForm; 
        this.createSeller({
            name: form.name.value,
            location: form.location.value,
            email: form.email.value,
            rating : 0,
        });
        form.name.value = '';
        form.location.value = '';
        form.email.value = '';
    }

    createSeller(newSeller){
        fetch('/adduser',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(newSeller),
        }).then(response => response.json())
        .catch(err =>{
            console.log(err.message);
        });
    }

    render(){
        return(
            <div>
                <Webhead/>
                <div className="container-fluid">
                    <h2>Join Us Now: </h2>
                    <form name="addUserForm" onSubmit={this.handleSubmit}>
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="text" name="email" placeholder="Email"/>
                        <input type="text" name="location" placeholder="Location"/>
                        <button type="submit">SignUp</button>
                    </form>
                </div>
            </div>    
        );
    }
}

class ShowUsers extends React.Component{
    constructor(){
        super();
      this.state = {sellers : []};
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch('/api/sellers').then(response => response.json()).then(data => {
            this.setState({ sellers : data.sellers }); 
        }).catch(err =>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <UserTable users={this.state.sellers}/>
            </div>
        );
    }
}

export default class UsersInfo extends React.Component{
    render(){
        return(
            <div>
                <AddUser/> 
                <hr/> 
                <h3> List of joined sellers : </h3>
                <ShowUsers/>
            </div>
        );
    }
}