import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class SignupModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        name: '',
        email:'' ,
        password: '',
        location: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePw = this.handleChangePw.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangePw(event) {
    this.setState({password: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangeLocation(event) {
    this.setState({location: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createSeller({
        name: this.state.name,
        location: this.state.location,
        email: this.state.email,
        password: this.state.password,
    });
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

    render() {
        return (
            <div>
                <Button color="light" onClick={this.toggle}>Signup</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                    <ModalHeader>SignUp</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Password</label>
                                <input type="password" value={this.state.password} onChange={this.handleChangePw} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Email</label>
                                <input type="email" value={this.state.team} onChange={this.handleChangeEmail} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>City / District</label>
                                <input type="text" value={this.state.location} onChange={this.handleChangeLocation} className="form-control" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="SignUp" color="primary" className="btn btn-primary" />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
    );
  }
}