import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import {
Favorite,
Fingerprint,
Group,
Spa
} from '@material-ui/icons'; 
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class FeaturesSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Features</h2>
            <h5 className={classes.description}>
              Built with MERN stack , Material UI and some {<Favorite color="error" />}
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Truster Sellers"
                description="Buy products from our trusted sellers spread across all states of India."
                icon={Group}
                iconColor="warning"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Fresh Crops"
                description="Find fresh crops from 1000+ organic farms across India."
                icon={Spa}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Secure Payments"
                description="With one click easy payment service, you don't need to worry about pending payments. Supports BTC, ETH, NEO."
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(FeaturesSection);
