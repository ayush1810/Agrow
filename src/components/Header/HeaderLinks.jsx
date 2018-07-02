/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import history from 'src/history.js'; 
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {
Close,
CloudDownload,
Email,
LockOutline,
Person,
Public
} from "@material-ui/icons";
import {
FaFacebookOfficial,
FaInstagram
} from 'react-icons/lib/fa';

import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class HeaderLinks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loginModal: false,
      role: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClickOpenC = this.handleClickOpenC.bind(this); 
    this.handleClickOpenS = this.handleClickOpenS.bind(this); 
  }

  handleLogin(e){
    e.preventDefault(); 
    let form = document.forms.LoginForm;
    if (this.state.role == 'seller'){
      this.loginSeller({
        email : form.semail.value,
        password: form.spassword.value
      });
    }
    else if (this.state.role == 'customer'){
      this.loginCustomer({
        email : form.semail.value,
        password: form.spassword.value
      });
    }
  }

  loginSeller(usercreds){
    fetch('/api/sellers/login',
    {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(usercreds)
    })
    .then(response => response.json())
    .then(result => 
    {
        if(result.status == 'OK'){
          history.push({
            pathname:'/profile',
           });
        }
        else{
          console.log("Seller Login Error!");
        }
    })
    .catch(err =>{
      alert(err.message);
    });
  }

  loginCustomer(usercreds){
    fetch('/api/customers/login',
    {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(usercreds)
    })
    .then(response => response.json())
    .then(result => 
    {
        if(result.status == 'OK'){
          history.push({
            pathname:'/home',
           });
        }
        else{
          console.log("Customer Login Error: that didn't work!");
        }
    })
    .catch(err =>{
      alert(err.message);
    });
  }

  handleClickOpenC() {
    this.setState({
      loginModal: true,
      role: 'customer'
    });
  }

  handleClickOpenS() {
    this.setState({
      loginModal: true,
      role: 'seller'
    });
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  render(){
    const { classes } =this.props;
    return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Login"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Person}
          dropdownList={[
            <Button
            color="transparent"
            block
            onClick={() => this.handleClickOpenC()}
            className = {classes.loginButton}
            >
            Customer
          </Button>,
            <Button
            color="transparent"
            block
            onClick={() => this.handleClickOpenS()}
            className = {classes.loginButton}
            >
            Seller
          </Button>
          ]}
        />
      </ListItem>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.state.loginModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.handleClose("loginModal")}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.handleClose("loginModal")}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Login</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form className={classes.form} name="LoginForm">  
            <CustomInput
              labelText="Email"
              id="semail"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "email",
                endAdornment: (
                  <InputAdornment position="end">
                    <Email className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
            <CustomInput
              labelText="Password"
              id="spassword"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutline
                      className={classes.inputIconsColor}
                    />
                  </InputAdornment>
                )
              }}
            />
            </form> 
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="success" onClick={(e)=>this.handleLogin(e)}>
            Login
          </Button>
          <Button
            onClick={() => this.handleClose("loginModal")}
            color="danger"
            
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem className={classes.listItem}>
        <Button
          href="https://github.com/ayush1810/agrow"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Public className={classes.icons} /> How It Works
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/ayushagrawal1810"
            target="_blank"
            className={classes.navLink}
          >
          <FaFacebookOfficial className={classes.socialIcons}/>
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/agrawal_ayushh"
            target="_blank"
            className={classes.navLink}
          >
            <FaInstagram className={classes.socialIcons} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
