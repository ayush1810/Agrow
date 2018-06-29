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
Delete,
Edit  
} from '@material-ui/icons';

import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const AddItem = props => {
  function handleAdditem(e){
    e.preventDefault();
    let form = document.forms.addItemForm; 
    props.addItem({
      name: form.name.value,
      quantity: parseFloat(form.quantity.value),
      rate: parseFloat(form.rate.value), 
      dateEnd: form.endbid.value
    });
  }
  return (
    <form name="addItemForm" style={{paddingLeft:'10px'}}> 
      <CustomInput
        id="name"
        inputProps={{
          placeholder: "Name"
        }}
        formControlProps={{
          fullWidth: false
        }}
      />
      <CustomInput
        id="quantity"
        inputProps={{
          placeholder: "Quantity (KGs)"
        }}
        formControlProps={{
          fullWidth: false
        }}
      />
      <CustomInput
        id="rate"
        inputProps={{
          placeholder: "Rate (per Kg)"
        }}
        formControlProps={{
          fullWidth: false
        }}
      />
      <CustomInput
        id="endbid"
        inputProps={{
          type: 'date', 
          placeholder: "End Bid On"
        }}
        formControlProps={{
          fullWidth: false
        }}
      />
      <Button color="primary" size="sm" onClick={(e)=> handleAdditem(e)}>
                  ADD
      </Button> 
    </form> 
  );
};

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
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
    icons: {
      margin: '0',
      padding: '0 2px',
      width:'5px',
      height:'5px',
    }
});

class ItemsSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items : []  
    };
    this.loadData = this.loadData.bind(this); 
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this); 
  }

  componentDidMount(){
    this.loadData();
  }
  loadData(){
      fetch(`/api/seller/items`,{
          method: 'GET',
          credentials: 'include'
      }).then(response => response.json()).then(data => {
          this.setState({items: data.records });
      }).catch(err =>{
          console.log("Itemsection Error: "+err.message);
      });
  }
  deleteItem(itemid){
    fetch(`/deleteItem/${itemid}`,{method: 'DELETE'})
    .then(response => {
        this.loadData(this.props.userid);
    });
    this.loadData();
  }
  addItem(newItem){
    fetch('/addItem',{
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(newItem),
    }).then(response => response.json()).then(updatedItem => {
        const newItems  = this.state.items.concat(updatedItem);
        this.setState({items:newItems});
    }).catch(err =>{
        console.log("AddItem Error: "+err.message);
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
                            <CustomTableCell>{`#`}</CustomTableCell>
                            <CustomTableCell>Status</CustomTableCell>
                            <CustomTableCell>Entity Name</CustomTableCell>
                            <CustomTableCell>Quantity</CustomTableCell>
                            <CustomTableCell>Rs./Kg</CustomTableCell>
                            <CustomTableCell>Created On</CustomTableCell>
                            <CustomTableCell>End On</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                          this.state.items.length ? (
                          this.state.items.map(item => {
                            return (
                              <TableRow className={classes.row} key={item._id}>
                                <CustomTableCell component="th" scope="row" className={classes.icons}>
                                  <Button
                                    justIcon
                                    color="transparent"
                                    onClick={()=> this.deleteItem(item._id)}
                                  >
                                    <Delete/>
                                  </Button> 
                                </CustomTableCell>
                                <CustomTableCell>{item.status}</CustomTableCell>
                                <CustomTableCell >{item.name}</CustomTableCell>
                                <CustomTableCell numeric>{item.quantity}</CustomTableCell>
                                <CustomTableCell numeric>{item.rate}</CustomTableCell>
                                <CustomTableCell>{item.dateCreated.split('T')[0]}</CustomTableCell>
                                <CustomTableCell>{item.dateEnd.split('T')[0]}</CustomTableCell>
                              </TableRow>
                            );
                        })
                      ) : (
                        <TableRow className={classes.row}>
                        0 Items Found 
                        </TableRow>
                      )
                      }
                    </TableBody>
                </Table>  
                <AddItem addItem={this.addItem} />
            </Paper>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ItemsSection);
