import React from "react";
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
import profileImage from "assets/img/faces/avatar.jpg";

class UserHeaderLinks extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classes } =this.props;
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
                        src={profileImage}
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
export default withStyles(userHeaderLinksStyle)(UserHeaderLinks);