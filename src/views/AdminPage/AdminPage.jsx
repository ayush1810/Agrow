import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import {
Category,
Dashboard,
People,
Person,
Schedule,
ViewList
} from "@material-ui/icons";
import {
FaFacebookOfficial,
FaGooglePlus
} from 'react-icons/lib/fa';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

// import CategorySection from "./Sections/CategorySection.jsx";
import CustomPaginationActionsTable from "./Sections/CategorySection.jsx"; 
import ProductSection from "./Sections/ProductSection.jsx"; 
import SellerSection from "./Sections/SellerSection.jsx"; 
import ItemSection from "./Sections/ItemSection.jsx"; 
import CustomerSection from "./Sections/CustomerSection.jsx"; 

import adminPageStyle from "assets/jss/material-kit-react/views/adminPage.jsx";

import image from "assets/img/login_bg.jpeg";

class AdminPage extends React.Component{
    constructor(props){
        super(props); 
    }
    render(){
        const {classes, ...rest} = this.props;
        return(
            <div>
            <div
            className={classes.pageHeader}
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center"
            }}
            >
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12}>
                <NavPills
                  color="rose"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 4, md: 2 },
                    contentGrid: { xs: 12, sm: 8, md: 10 }
                  }}
                  tabs={[
                    {
                      tabButton: "Category",
                      tabIcon: Dashboard,
                      tabContent: (<CustomPaginationActionsTable/>)
                    },
                    {
                      tabButton: "Products",
                      tabIcon: Dashboard,
                      tabContent: (<ProductSection/>)
                    },
                    {
                        tabButton: "Sellers",
                        tabIcon: Person,
                        tabContent: (<SellerSection/>)
                    },
                    {
                        tabButton: "Items",
                        tabIcon: ViewList,
                        tabContent: (<ItemSection/>)
                    },
                    {
                        tabButton: "Customers",
                        tabIcon: People,
                        tabContent: (<CustomerSection/>)
                    }
                  ]}
                />
                </GridItem>
                </GridContainer>
            </div>
            </div>
            </div>
        );
    }
}
export default withStyles(adminPageStyle)(AdminPage);