import React from 'react';
import { Popover,Tooltip,Modal, OverlayTrigger, FormGroup, FormControl, ControlLabel, InputGroup,
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

export default class LoginModel extends React.Component {
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
              </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

