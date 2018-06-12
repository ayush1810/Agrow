import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
    alert("You are now logged in!");
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