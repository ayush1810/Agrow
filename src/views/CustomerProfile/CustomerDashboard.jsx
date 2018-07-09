import React from 'react'; 
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import history from './history.js'; 
import {
} from "@material-ui/icons";

import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import UserHeaderLinks from "components/Header/UserHeaderLinks.jsx";

import customerHomePageStyle from "assets/jss/material-kit-react/views/customerHomePage.jsx"
import ProductSection from "./Sections/ProductSection.jsx"; 

class CustomerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            user: {},
            categories: []
        }
    }

    componentDidMount(){
        this.setState({
            user: this.props.history.location.state.user,
        }, ()=>{
            fetch(`/api/categories`,{
                method: 'GET'
            }).then(response => response.json()).then((data)=>{
               this.setState({
                categories: data.records
               });
            }).catch((err)=>{
                console.log("Loading Categories "+ err);
            });
            alert("Wallet Balance:  "+ this.state.user.wallet);
        });
    }

    render(){
        const { classes, ...rest } = this.props;
        const {user, categories} = this.state; 
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
                                <div className={classes.filter}>
                                    {categories.map((item, index)=>{
                                        return(
                                            <Button key={index} color="primary" round>
                                                {item.name}
                                            </Button>
                                        );  
                                    })
                                    }
                                </div> 
                            </GridItem> 
                            <GridItem xs={12}>
                                <ProductSection/> 
                            </GridItem>
                        </GridContainer> 
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(customerHomePageStyle)(CustomerDashboard);