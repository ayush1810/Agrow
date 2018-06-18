import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import createHistory from "history/createHashHistory";
const history = createHistory();

export default class LoginModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        email:'' ,
        password: '',
    };

    this.toggle = this.toggle.bind(this);
    this.handleChangePw = this.handleChangePw.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangePw(event) {
    this.setState({password: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.loginUser({
        email : this.state.email,
        password : this.state.password 
    });
    }
  
  loginUser(usercreds){
    fetch('/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(usercreds),
    }).then(response => response.json()).then(updatedUser => {
        this.toggle();
        this.props.authenticate();
        history.push({
         pathname:'/dashboard',
         state: {user : updatedUser }
        });
    }).catch(err =>{
        console.log(err.message);
    });
}

  render() {
        return (
            <div>
                <Button color="light" onClick={this.toggle}>Login</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                    <ModalHeader>LOGIN</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Email</label>
                                <input type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Password</label>
                                <input type="password" value={this.state.password} onChange={this.handleChangePw} className="form-control" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Login" color="primary" className="btn btn-primary" />
                        <Button color="danger" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
    );
  }
}