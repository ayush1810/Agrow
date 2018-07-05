import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";

import productPageStyle from 'assets/jss/material-kit-react/views/productPage.jsx'; 

class ProductPage extends React.Component {
    render(){
        const {classes} = this.props; 
        return(
            <div className={classes.container}>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <GridContainer>
                        <GridItem xs={12}>
                            Here for item {this.props.match.params.id}
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem doloribus nostrum tempore alias ex eligendi dolores assumenda accusantium aliquid. Eligendi exercitationem fuga magnam inventore iure placeat laborum adipisci qui. Dignissimos.
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(productPageStyle)(ProductPage); 