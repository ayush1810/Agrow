import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {
Paper,
Table,
TableBody,
TableCell,
TableHead,
TableRow
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
});

class ItemsSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items : [],
      pID: null     
    };
  }

  componentDidMount(){
      this.loadData(this.state.pID); 
  }

  loadData(uid){
    fetch(`/api/seller/${uid}`,{
        method: 'GET',
    }).then(response => response.json()).then(data => {
        this.setState({items: data.records });
    }).catch(err =>{
        console.log(err.message);
    });
    }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Your Items</h2>
        <div>
          <GridContainer>
          <GridItem xs={12} className={classes.navWrapper}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Entity Name</CustomTableCell>
                            <CustomTableCell>Date Added</CustomTableCell>
                            <CustomTableCell>Bid Ends On</CustomTableCell>
                            <CustomTableCell numeric>Quantity (Kg)</CustomTableCell>
                            <CustomTableCell numeric>Rate (per Kg)</CustomTableCell>
                            <CustomTableCell>Status</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.items.map(item => {
                        return (
                            <TableRow className={classes.row} key={item._id}>
                            <CustomTableCell component="th" scope="row">
                                {item.name}
                            </CustomTableCell>
                            <CustomTableCell>{item.dateCreated.split('T')[0]}</CustomTableCell>
                            <CustomTableCell>{item.dateEnd.split('T')[0]}</CustomTableCell>
                            <CustomTableCell numeric>{item.quantity}</CustomTableCell>
                            <CustomTableCell numeric>{item.rate}</CustomTableCell>
                            <CustomTableCell>{item.status}</CustomTableCell>
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>  
            </Paper>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ItemsSection);
