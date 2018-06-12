import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { Col, Row,Popover,Tooltip,Modal, OverlayTrigger, FormGroup, FormControl, ControlLabel, InputGroup,
    ButtonToolbar, Button } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

const loginFormInstance = (
    <form>
        <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter a valid email address"
        />
        <FieldGroup id="formControlsPassword" label="Password" type="password" />
        <Button bsStyle="success" type="submit">LOGIN</Button>
    </form>    
);   
const signupFormInstance = (
    <form>
        <FieldGroup
        id="formControlsText"
        type="text"
        label="Name"
        placeholder="Enter your full name"
        />
        <FieldGroup
        id="formControlsEmail"
        type="email"
        label="Email address"
        placeholder="Enter a valid email address"
        />
        <FieldGroup id="formControlsPassword" label="Password" type="password" />
        {/* <FormGroup>
        <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
        <Checkbox inline>3</Checkbox>
        </FormGroup>
        <FormGroup>
        <Radio name="radioGroup" inline>
            1
        </Radio>{' '}
        <Radio name="radioGroup" inline>
            2
        </Radio>{' '}
        <Radio name="radioGroup" inline>
            3
        </Radio>
        </FormGroup> */}
        <FormGroup controlId="formControlsSelect">
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
        <FieldGroup
        id="formControlsText"
        type="text"
        label="City / District"
        placeholder="Enter a City or District"
        />
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
        </FormGroup>
        <Button bsStyle="success" type="submit">SIGN UP</Button>
    </form>
);

class LoginModel extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      return (
        <div>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
            LOGIN
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Welcome back. </h4>
              <hr />
                {loginFormInstance}
              </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class SignupModel extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
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
            Signup
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
                {signupFormInstance}
              </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default class Webhead extends React.Component{
    render(){
        return(
            <Navbar fluid inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">AGROW</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            Users
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link2
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            <LoginModel/>
                        </NavItem>
                        <NavItem>
                            <SignupModel/>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}