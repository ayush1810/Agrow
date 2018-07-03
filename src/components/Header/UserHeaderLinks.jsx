import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import history from 'src/history.js'; 
import withStyles from "@material-ui/core/styles/withStyles";

import {
Home
} from "@material-ui/icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import userHeaderLinksStyle from "assets/jss/material-kit-react/components/userHeaderLinksStyle.jsx";

import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

class UserHeaderLinks extends React.Component{
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this); 
    }

    logOut(){
        fetch("/logout", {
            method: 'GET',
            credentials: 'include'
        }).then(response =>{
            history.push({
                pathname: '/'
            });
        });
    }
    
    render(){
        const { classes, profileimg } =this.props;
        return(
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Button
                        justIcon
                        round
                        href="/"
                        className={classes.notificationNavLink}
                        onClick={e => e.preventDefault()}
                        color="github"
                    >
                        <Home className={classes.icons} />
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                <CustomDropdown
                    left
                    caret={false}
                    hoverColor="black"
                    dropdownHeader="AGROW"
                    buttonText={
                    <img
                        src=
                        {
                            profileimg ? profileimg : "https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=2&h=21&w=20"
                        }
                        className={classes.img}
                        alt="profile"
                    />
                    }
                    buttonProps={{
                    className:
                        classes.navLink + " " + classes.imageDropdownButton,
                    color: "transparent"
                    }}
                    dropdownList={[
                        <Button
                            color="transparent"
                            block
                        >
                            My Orders
                        </Button>,
                        <Button
                            color="transparent"
                            block
                        >
                            Edit Profile
                        </Button>,
                        { divider: true },
                        <Button
                            color="transparent"
                            block
                            onClick={()=> this.logOut() }
                        >
                            Sign Out
                        </Button>                                            
                    ]}
                />
                </ListItem>
            </List>
        );
    }
}

UserHeaderLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    profileimg: PropTypes.string
};
export default withStyles(userHeaderLinksStyle)(UserHeaderLinks);