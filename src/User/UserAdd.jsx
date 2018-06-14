import React from 'react';
import { Button, Modal, ModalHeader, FormGroup,Label,Input, ModalBody, ModalFooter } from 'reactstrap';

export default class SignupModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        name: '',
        email:'' ,
        password: '',
        ustate: '',
        city: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePw = this.handleChangePw.bind(this);
    this.handleChangeStUt = this.handleChangeStUt.bind(this);
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
  handleChangeStUt(event) {
    this.setState({ustate: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangeLocation(event) {
    this.setState({city: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createSeller({
        name: this.state.name,
        state: this.state.ustate,
        city: this.state.city,
        email: this.state.email,
        password: this.state.password,
    });
    }

    createSeller(newSeller){
        fetch('/adduser',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(newSeller),
        }).then(response => response.json()).then(updatedSeller => {
            alert("Signup successful. Dashboard loading soon");
        }).catch(err =>{
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
                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" value={this.state.password} onChange={this.handleChangePw} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" value={this.state.team} onChange={this.handleChangeEmail} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <FormGroup>
                                    <Label for="formstates">State / U.T.</Label>
                                    <Input type="select" name="select" id="formstates" value={this.state.state} onChange={this.handleChangeStUt}>
                                        <option value="select">Select State</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Orissa">Orissa</option>
                                        <option value="Pondicherry">Pondicherry</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttaranchal">Uttaranchal</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
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