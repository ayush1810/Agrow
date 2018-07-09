import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";

import BidTable from './Sections/BidTable.jsx';
import productPageStyle from 'assets/jss/material-kit-react/views/productPage.jsx'; 

const Bidform = (props) => {
    return(
        <form name="addBidForm"> 
        <CustomInput
            id="bidval"
            inputProps={{
                type: 'number',
                placeholder: "Rate per Kg"
            }}
            formControlProps={{
                fullWidth: false
            }}
        />
        <Button color="primary" size="sm" onClick={(e)=> props.handleAddBid(e)}>
                    ADD BID
        </Button> 
    </form> 
    );
}

class ProductPage extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            item: {},
            customer: {},
            bids: [],
            showBidBox: null
        };
        this.handleAddBid = this.handleAddBid.bind(this);
        this.modifyWallet = this.modifyWallet.bind(this); 
        this.bidsection = this.bidsection.bind(this); 
        this.checkPastBid = this.checkPastBid.bind(this); 
    } 
    componentWillMount(){
        this.loadData();
        this.loadBids();
        this.checkPastBid();
    }

    loadData(){
        fetch(`/api/items/${this.props.match.params.id}`,{
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            this.setState({
                item : data.records,
                customer: data.customer
            });
        }).catch(err => {
            alert("Product Page Error: "+err);
        });
    } 

    loadBids(){
        fetch(`/api/bids/${this.props.match.params.id}`,{
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.records){
                this.setState({bids: data.records }, ()=>{
                    console.log("Loaded bids "+ JSON.stringify(this.state.bids));
                });
            }
        }).catch(err =>{
            console.log(err.message);
        }); 
    }

    checkPastBid(){
        fetch(`/pastbids/${this.props.match.params.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            if (data.status){
                this.setState({
                    showBidBox : 0
                });
            }
            else { 
                this.setState({
                    showBidBox: 1
                });
            }
        }).catch(err => {
            alert("Check Bid Error: "+err);
        });
    }

    handleAddBid(e){
        e.preventDefault();
        const {item, customer} = this.state;
        let form = document.forms.addBidForm; 
        let bidval = form.bidval.value; 
        if (bidval > item.rate){
            let total = bidval * item.quantity;
            if (customer.wallet < total){
                alert("Insufficient Balance!\nTotal :   " + total + "   Wallet   :   "+customer.wallet);
              }
              else{ 
                fetch('/addbid', {
                    method: 'POST',
                    credentials:'include',
                    headers:  {'Content-Type': 'application/json'},
                    body : JSON.stringify({
                        item: item._id,
                        bidder: customer._id,
                        value: total
                    }),
                    }).then(response => response.json()).then(() =>{
                        this.loadBids();
                        this.checkPastBid();
                        this.modifyWallet(customer.wallet - total);
                    }).catch(err => {
                        console.log("Adding Bid Error: "+ err);
                    });
              }

          }
          else{
            alert("Please add a higher bid"); 
          }
          form.bidval.value = ''; 
    }

    modifyWallet(balance){
        fetch(`/customer/wallet`,{
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                customer: this.state.customer._id,
                amount : balance
            }),
          }).then(response => response.json()).then(response => {
            this.setState({
                customer : response
            },()=>{
                alert("Congratulations! Your bid has been accepted!\nUpdated Wallet: "+ this.state.customer.wallet);
            });
          })
          .catch(err => {
            console.log(err.message);
          });        
    }

    bidsection(id){
        switch(id){
            case 0: return <b>Thank you for bidding on this item!</b>;
            case 1: return <Bidform handleAddBid={this.handleAddBid} />;
            default : return null; 
        }
    }

    render(){
        const {classes} = this.props; 
        const {item} = this.state; 
        const {...seller} = item.seller;
        return(
            <div className={classes.container}>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <GridContainer>
                        <GridItem xs={12} sm={2} md={4}>
                        <img
                            src={item.image+"?h=200&w=300"}
                            alt="..."
                            className={classNames(classes.filter, classes.imgRounded, classes.imgFluid, classes.imgRaised)}
                        />
                        </GridItem>
                        <GridItem xs={12} sm={10} md={8}>
                           Item #{item._id} <br/> 
                            <h3>{item.name}</h3>
                            <h4>Seller :
                                 {seller.name}
                            </h4>  
                            <h4>Quantity :
                                 {item.quantity}
                            </h4>  
                            <h4> Rate (per Kg): 
                                {item.rate}
                            </h4>  
                            <h4>
                                {
                                    this.bidsection(this.state.showBidBox)
                                }
                            </h4>
                        </GridItem>
                    </GridContainer>
                    <GridContainer> 
                        <GridItem xs={12}>
                            <BidTable data={this.state.bids}/>
                        </GridItem> 
                    </GridContainer>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default withStyles(productPageStyle)(ProductPage); 