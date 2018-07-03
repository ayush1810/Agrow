import React from 'react'; 
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import history from './history.js'; 
import {
Email
} from "@material-ui/icons";

import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import UserHeaderLinks from "components/Header/UserHeaderLinks.jsx";

import customerHomePageStyle from "assets/jss/material-kit-react/views/customerHomePage.jsx"
import ProductSection from "./Sections/ProductSection.jsx"; 

const ProductFilter = props => {
    const {classes} = props;
    return(
        <div className={classes.filter}>
        <Button color="primary" round>
          Fruits
        </Button>
        <Button color="primary" round>
            Vegetables
        </Button>
        <Button color="primary" round>
            Grains
        </Button>
        </div>
    );
}
const ProductFilterWrapped = withStyles(customerHomePageStyle)(ProductFilter); 

class CustomerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            user: {}
        }
        this.modifyWallet = this.modifyWallet.bind(this); 
        this.handleNewBid = this.handleNewBid.bind(this); 
    }

    componentDidMount(){
        this.setState({
            user: this.props.history.location.state.user,
        }, ()=>{
            alert("Wallet Balance:  "+ this.state.user.wallet)
        });
    }
    handleNewBid(total){
        let balance = this.state.user.wallet; 
        if (balance < total){
            alert("Insufficient Balance!\nTotal :   " + total + "\nWallet   :   "+balance);
          }
          else{ 
            this.modifyWallet(balance - total);
          }
    }

    modifyWallet(balance){
        fetch(`/customer/wallet`,{
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                customer: this.state.user._id,
                amount : balance
            }),
          }).then(response => response.json()).then(response => {
            this.setState({
                user : response
            },()=>{
                alert("Congratulations! Your bid has been accepted!\nUpdated Wallet: "+ this.state.user.wallet);
            });
          })
          .catch(err => {
            console.log(err.message);
          });        
    }
    render(){
        const { classes, ...rest } = this.props;
        const {user} = this.state; 
        return(
            <div>
                <Header
                    color="dark"
                    brand="AGROW"
                    rightLinks={<UserHeaderLinks/>}
                    fixed
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <div className={classes.container}>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <GridContainer justify="center">
                            <GridItem xs={12}>
                                <ProductFilterWrapped/>
                            </GridItem> 
                            <GridItem xs={12}>
                                <ProductSection
                                    handleNewBid = {this.handleNewBid}
                                /> 
                            </GridItem>
                        </GridContainer> 
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(customerHomePageStyle)(CustomerDashboard);