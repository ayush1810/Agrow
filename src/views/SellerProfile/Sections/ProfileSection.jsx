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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import team1 from "assets/img/faces/avatar.jpg";
import profileStyle from "assets/jss/material-kit-react/views/sellerProfileSections/profileStyle.jsx"; 

class ProfileSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  loadProfile(){

    // fetch(`/api/seller/${uid}`,{
    //     method: 'GET',
    // }).then(response => response.json()).then(data => {
    //     this.setState({items: data.records });
    // }).catch(err =>{
    //     console.log(err.message);
    // });
    }

  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Your Profile</h2>
        <div>
          <GridContainer className={classes.justifyCenter}> 
          <GridItem xs={12}>
              <Card style={{width: "20rem"}}>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team1} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Gigi Hadid
                  <br />
                  <small className={classes.smallTitle}>{this.props.user}</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members.
                    You can give more details about what they do. Feel free to
                    add some <a href="#pablo">links</a> for people to be able to
                    follow them outside the site.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    color="info"
                  >
                    EDIT PROFILE
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(profileStyle)(ProfileSection);
