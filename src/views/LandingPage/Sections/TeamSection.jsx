import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import {
AttachMoney
} from '@material-ui/icons';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

const ProductCard = (props) => {
  const classes = props.classes; 
  return (
    <GridItem xs={12} sm={12} md={4}>
      <Card plain>
        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
          <img src="https://images.pexels.com/photos/42164/pexels-photo-42164.jpeg?auto=compress&cs=tinysrgb&h=130&w=200" alt="..." className={props.imageClasses} />
        </GridItem>
        <h4 className={classes.cardTitle}>
        {props.item.name}
          <br />
          <small className={classes.smallTitle}>{props.item.seller.name}</small>
        </h4>
        <CardBody>
          <p className={classes.description}>
            Quantity: {props.item.quantity}
            <br/>
            Rate: {props.item.rate}
          </p>
        </CardBody>
        <CardFooter className={classes.justifyCenter}>
          <Button
            round
            color="facebook"
          >
            <AttachMoney className={classes.icons}/> BID
          </Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

const ProductGrid = (props) => {
  return (
    props.products.map((item) =>{
        return(
            <ProductCard key={item._id} item={item} classes={props.classes} imageClasses={props.imageClasses}/>
        );
    }) 
    );
}

class TeamSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items : []
    };
    this.loadProducts = this.loadProducts.bind(this); 
  }

  componentDidMount(){
    this.loadProducts();
  }

  loadProducts(){
    fetch('/api/items',{method: 'GET'}).then(response => response.json()).then(data => {
      this.setState({items: data.items});
    }).catch(err =>{
        console.log(err.message);
    });
  }

  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Trending Products</h2>
        <div>
          <GridContainer>
            <ProductGrid products={this.state.items} classes={classes} imageClasses={imageClasses} /> 
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
