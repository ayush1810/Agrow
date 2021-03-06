import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import {
Camera
} from "@material-ui/icons";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import UserHeaderLinks from "components/Header/UserHeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import ItemsSection from "./Sections/ItemsSection.jsx";
import ProfileSection from "./Sections/ProfileSection.jsx"; 
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

class SellerDashboard extends React.Component {

  constructor(props)
  {
    super(props); 
    this.state = {
      user: {}
    };
  }

  componentDidMount(){
    fetch('/profile',
    {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json()).then(user => 
      {this.setState({ user:user });
    }).catch(err => 
      {
        alert("Seller Dashboard Error: " + err.message);
        this.props.history.push({
          pathname:'/',
          state: {
            from: this.props.pathname
          }
        });
    });
  }
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <div>
        <Header
          color="transparent"
          brand="AGROW"
          rightLinks={<UserHeaderLinks profileimg={this.state.user.profile} />}
          fixed
          changeColorOnScroll={{
            height: 50,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/profile-bg.jpeg")} className={classes.reparallax} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} >
                <ItemsSection/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} > 
                <ProfileSection user={this.state.user}/>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(SellerDashboard);
