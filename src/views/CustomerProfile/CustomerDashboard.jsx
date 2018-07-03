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
    }
    render(){
        const { classes, ...rest } = this.props;
        const {user} = this.props.history.location.state; 
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
                                user={user ? user : null}
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