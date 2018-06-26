/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {
CloudDownload,
Person,
Public
} from "@material-ui/icons";
import {
FaFacebookOfficial,
FaInstagram
} from 'react-icons/lib/fa';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Login"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Person}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Customer
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Seller
             </Link>
            // <a
            //   href="https://creativetimofficial.github.io/material-kit-react/#/documentation"
            //   target="_blank"
            //   className={classes.dropdownLink}
            // >
            //   Seller
            // </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://github.com/ayush1810/agrow"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Public className={classes.icons} /> How It Works
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/ayushagrawal1810"
            target="_blank"
            className={classes.navLink}
          >
          <FaFacebookOfficial className={classes.socialIcons}/>
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/agrawal_ayushh"
            target="_blank"
            className={classes.navLink}
          >
            <FaInstagram className={classes.socialIcons} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
