import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {
Paper,
Table,
TableBody,
TableCell,
TableHead,
TableRow
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import profileStyle from "assets/jss/material-kit-react/views/sellerProfileSections/profileStyle.jsx"; 

class ProfileSection extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render() {
    const { classes, user } = this.props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Your Profile</h2>
        <div>
              <Card style={{width: "20rem"}}>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={user.profile} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  {user.name}
                  <br />
                  <small className={classes.smallTitle}>{user.email}</small>
                </h4>
                <CardBody>
                  <h4 className={classes.description}>
                    City:{` `} <small> {user.city}, {user.state} </small>
                    <br/>
                    Wallet:{` `}<small>{user.wallet}</small>
                  </h4>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    color="info"
                  >
                    EDIT PROFILE
                  </Button>
                </CardFooter>
              </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(profileStyle)(ProfileSection);
