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
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import profile from "assets/img/faces/christian.jpg";
import ItemsSection from "./Sections/ItemsSection.jsx";
import ProfileSection from "./Sections/ProfileSection.jsx"; 
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

class SellerDashboard extends React.Component {

  constructor(props)
  {
    super(props); 
    this.state = {
      userID: null
    };
  }

  componentDidMount(){
    console.log("Fetching user data");
    fetch('/profile',
    {
      method: 'GET'
    })
    .then(response => response.json()).then(user => 
    {
      this.setState({  userID: user._id });
      console.log("From state "+ this.state.userID);
    })
    .catch(err => 
    {
      alert("errOR " + err.message); 
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
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/profile-bg.jpeg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6} >
                  Seller ID: {this.state.userID}
                  <ItemsSection/>      
                </GridItem>
                <GridItem xs={12} sm={12} md={6} >
                <ProfileSection/> 
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
