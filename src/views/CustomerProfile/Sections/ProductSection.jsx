import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import history from 'src/history.js';
// @material-ui/icons
import {
AttachMoney,
Close
} from '@material-ui/icons';

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { cardTitle } from "assets/jss/material-kit-react.jsx";
import imagesStyle from "assets/jss/material-kit-react/imagesStyles.jsx";
import modalStyle from "assets/jss/material-kit-react/modalStyle.jsx";

const productStyle = {
  section: {
    padding: "0px 30px",
    textAlign: "center"
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle,
  smallTitle: {
    color: "#6c757d"
  },
  description: {
    color: "#999"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  ...modalStyle,
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  margin5: {
    margin: "5px"
  }
};

const ProductCard = (props) => {
    const classes = props.classes; 
    return (
      <GridItem xs={6} sm={4} md={3}>
        <Card>
          <GridItem xs={12} className={classes.itemGrid}>
            <img src="https://images.pexels.com/photos/42164/pexels-photo-42164.jpeg?auto=compress&cs=tinysrgb&h=130&w=200" alt="..." className={props.imageClasses} />
          </GridItem>
          <h4 className={classes.cardTitle}>
            <Button
                simple
                color="transparent"
                onClick={() => history.push({
                  pathname: `/products/${props.item._id}`
                }) }
            >
              {props.item.name}
            </Button>
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
              color="primary"
              onClick={() => history.push({
                pathname: `/products/${props.item._id}`
              })}
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

class ProductSection extends React.Component {
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
        this.setState({items: data.records});
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
          <div>
            <GridContainer>
              <ProductGrid products={this.state.items} classes={classes} imageClasses={imageClasses}/> 
            </GridContainer>
          </div>
        </div>
      );
    }
}
  
export default withStyles(productStyle)(ProductSection);