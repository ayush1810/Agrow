import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import FeaturesSection from "./Sections/FeaturesSection.jsx";
import ProductsSection from "./Sections/ProductsSection.jsx";
// import WorkSection from "./Sections/WorkSection.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="AGROW"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>An experimental agro-bidding project.</h1>
                <h4>
                  Trade crops instantly with no middlemen involved. <br/>
                  Easy payments through leading cryptocurrencies. 
                </h4>
                <br />
                <Link to={"/register"} className={classes.link}>
                  <Button color="google" size="lg">
                    SIGNUP
                  </Button>
                </Link>
                <Link to={"/home"} className={classes.link}>
                  <Button color="facebook" size="lg">
                    Profile
                  </Button>
                </Link>
                <Link to={"/admin"} className={classes.link}>
                  <Button color="rose" size="lg">
                    ADMIN
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <FeaturesSection/>
            <ProductsSection />
            {/* <WorkSection /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);