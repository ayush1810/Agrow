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

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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

  function onClickBid(item){
   props.AddBid(item); 
  }

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
              onClick={() => onClickBid(props.item)}
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
              <ProductCard key={item._id} item={item} classes={props.classes} imageClasses={props.imageClasses} AddBid={props.addBid}/>
          );
      }) 
      );
  }

class ProductSection extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        items : [],
        selecteditem:{},
        newBidModal: false
      };
      this.loadProducts = this.loadProducts.bind(this); 
      this.handleBid = this.handleBid.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
      this.handleNewBid = this.handleNewBid.bind(this);
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
    handleBid(item){
      this.setState({
        selecteditem: item,
        newBidModal : true
      });
    }

    handleNewBid(e){
      e.preventDefault();
      const {selecteditem} = this.state;
      let form = document.forms.addBidForm; 
      let bid = parseFloat(form.bidvalue.value);
      if (bid > selecteditem.rate){
        this.handleModalClose();
        this.props.handleNewBid(selecteditem, bid);
      }
      else{
        alert("Please add a higher bid"); 
      }
      form.bidvalue.value = ''; 
    }

    handleModalClose(){
      this.setState({
        newBidModal: false
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
              <ProductGrid products={this.state.items} classes={classes} imageClasses={imageClasses} addBid={this.handleBid} /> 
            </GridContainer>

                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    open={this.state.newBidModal}
                    keepMounted
                    onClose={() => this.handleModalClose()}
                    aria-labelledby="new-bid-modal"
                    aria-describedby="new-bid-description"
                  >
                    <form name="addBidForm" style={{paddingLeft:'10px'}}> 
                    <DialogTitle
                      id="new-bid-modal"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => this.handleModalClose()}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle}>New Bid</h4>
                    </DialogTitle>
                    <DialogContent
                      id="new-bid-description"
                      className={classes.modalBody}
                    >
                        <CustomInput
                          id="bidvalue"
                          inputProps={{
                            placeholder: "Bid (per Kg)"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />        
            
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button
                        color="success"
                        onClick={(e)=> this.handleNewBid(e)}
                      >
                        Add
                      </Button>
                      <Button
                        onClick={() => this.handleModalClose()}
                        color="danger"
                      >
                        Close
                      </Button>
                    </DialogActions>
                    </form> 
                  </Dialog>

          </div>
        </div>
      );
    }
}
  
export default withStyles(productStyle)(ProductSection);