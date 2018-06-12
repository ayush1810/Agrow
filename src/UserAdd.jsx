import React from 'react';
import { Popover,Tooltip,Modal, OverlayTrigger, FormGroup, FormControl, HelpBlock, ControlLabel, InputGroup,
    ButtonToolbar, Button } from 'react-bootstrap';

export default class SignupModel extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.dismissValidation = this.dismissValidation.bind(this);
        this.showValidation = this.showValidation.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createSeller = this.createSeller.bind(this);
        this.state = {
        show: false,
        showingValidation: false,
        user: {
            name: '',
            email: '',
            password: '',
            location:''
        },
        };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    showValidation() {
        this.setState({ showingValidation: true });
      }
    dismissValidation() {
        this.setState({ showingValidation: false });
    }

    handleSubmit(e){
        e.preventDefault(); 
        console.log("Step 1");
        let form = document.forms.addUserForm; 
        this.createSeller({
            name: form.inputName.value,
            location: form.inputCity.value,
            email: form.inputEmail.value,
        });
        this.state.user.name = '';
        this.state.user.email = '';
        this.state.user.password = '';
        this.state.user.location = '';
        console.log("Step 1 finish");
    }

    createSeller(newSeller){
        console.log("Step 2");
        fetch('/adduser',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(newSeller),
        }).then(response => response.json())
        .catch(err =>{
            console.log(err.message);
        });
        console.log("Step 2 finish");
    }

    render() {
      const popover = (
        <Popover id="modal-popover" title="popover">
          Popover text coming soon! 
        </Popover>
      );
      const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
            SIGNUP
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Join us now to enjoy hassle-free trading!</h4>
                <h4 hidden>Popover in a modal</h4>
                <p hidden>
                there is a{' '}
                <OverlayTrigger overlay={popover}>
                  <a href="#popover">popover</a>
                </OverlayTrigger>{' '}
                here
                </p>
  
                <h4 hidden>Tooltips in a modal</h4>
                <p hidden>
                there is a{' '}
                <OverlayTrigger overlay={tooltip}>
                  <a href="#tooltip">tooltip</a>
                </OverlayTrigger>{' '}
                here
                </p>
                <hr />
                <form name="addUserForm" onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formName">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            inputRef={ref => { this.inputName = ref; }}
                            placeholder="Enter your full name"
                        />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formEmail">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            // value={this.state.user.email}
                            placeholder="Enter a valid email address"
                            inputRef={ref => { this.inputEmail = ref; }}
                        />
                        <HelpBlock>Email validation</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            // value={this.state.user.password}
                            placeholder="Enter a password of minimum 8 characters"
                        />
                        <HelpBlock>P/w verification</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formLocation">
                        <ControlLabel>City / District</ControlLabel>
                        <FormControl
                            type="text"
                            // value={this.state.user.location}
                            placeholder="Enter your city"
                            inputRef={ref => { this.inputCity = ref; }}
                        /> 
                        <HelpBlock>Hmmm</HelpBlock>
                    </FormGroup>
                    {/* <FormGroup controlId="formControlsSelect">
                        <ControlLabel>State / U.T. </ControlLabel>
                        <FormControl componentClass="select" placeholder="Select State">
                            <option value="select">------------Select State------------</option>
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
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>Languages (Hold CTRL to choose multiple)</ControlLabel>
                        <FormControl componentClass="select" multiple>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Marathi">Marathi</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Urdu">Urdu</option>
                            <option value="Gujrati">Gujrati</option>
                            <option value="Kannada">Kannada</option>
                            <option value="Punjabi">Punjabi</option>
                            <option value="Malayalam">Malayalam</option>
                            <option value="Odia">Odia</option>
                            <option value="Assamese">Assamese</option>
                        </FormControl>
                    </FormGroup> */}
                    <Button bsStyle="success" type="submit">SIGN UP</Button>
                </form>
              </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

