import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
// @material-ui/icons
import {
Check,
Email,
FiberManualRecord,
LockOutline,
People
} from "@material-ui/icons";
import {
FaFacebookOfficial,
FaGooglePlus
} from 'react-icons/lib/fa';
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/login_bg.jpeg";

const LoginSuccessNotification = (props) => {
  return(
    <div>
    <SnackbarContent
      message={
        <span>
          <b>Login Successful</b>. You'll be redirected to the dashboard.
        </span>
      }
      close
      color="success"
      icon={Check}
    />
    </div>
  );
} 

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      openSignupNotify: false,
      selectedEnabled: "customer"
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this); 
    this.handleSignUpNotifiyClose = this.handleSignUpNotifiyClose.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this); 
    this.registerSeller = this.registerSeller.bind(this); 
    this.registerCustomer = this.registerCustomer.bind(this); 

  }
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  handleRegisterSubmit(e){
    e.preventDefault();
    var form = document.forms.loginForm;
    if (this.state.selectedEnabled == 'seller'){
      this.registerSeller({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        state: form.state.value,
        city: form.city.value
      });
    }
    else { 
      this.registerCustomer({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        state: form.state.value,
        city: form.city.value
      });
    }
  }

  registerSeller(usercreds){
    fetch('/addseller',
    {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(usercreds),
    })
    .then(response => response.json())
    .then(result => 
    {
        if(result.status == 'OK'){
          this.props.history.push({
            pathname:'/profile',
           });
        }
        else{
          console.log("OOPS, that didn't work!");
        }
    })
    .catch(err =>{
      alert(err.message);
    });
  }

  registerCustomer(usercreds){
    fetch('/addcustomer',
    {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(usercreds),
    })
    .then(response => response.json())
    .then(result => 
    {
        if(result.status == 'OK'){
          this.props.history.push({
            pathname:'/profile',
           });
        }
        else{
          console.log("ERROR in Customer Creation");
        }
    })
    .catch(err =>{
      alert(err.message);
    });
  }

  handleSignUpNotifiyClose(e){
    this.setState({
      openSignupNotify : false
    });
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="AGROW"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                    <CardHeader color="success" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          href="#pablo"
                          target="_blank"
                          color="facebook"
                          onClick={e => e.preventDefault()}
                        >
                          <FaFacebookOfficial/>
                        </Button>
                        <Button
                          href="#pablo"
                          target="_blank"
                          color="google"
                          onClick={e => e.preventDefault()}
                        >
                          <FaGooglePlus/>
                        </Button>
                      </div>
                    </CardHeader>
                    <form className={classes.form} name="loginForm"> 
                    <CardBody>
                    <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.selectedEnabled === "customer"}
                        onChange={this.handleChangeEnabled}
                        value="customer"
                        name="radio button enabled"
                        aria-label="Customer"
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                        classes={{
                          checked: classes.radio
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Customer"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.selectedEnabled === "seller"}
                        onChange={this.handleChangeEnabled}
                        value="seller"
                        name="radio button enabled"
                        aria-label="Seller"
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                        classes={{
                          checked: classes.radio
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Seller"
                  />
                </div>
                      <CustomInput
                        labelText="Full Name"
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                        <CustomInput
                          labelText="Email"
                          id="email"
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
                          id="password"
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
                      <CustomInput
                        labelText="State / U.T."
                        id="state"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button default color="success" size="lg" onClick={this.handleRegisterSubmit}>
                        SIGNUP
                      </Button>
                    </CardFooter>
                    </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(SignupPage);
