import React from "react";
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import {
    Paper,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';

const styles = theme => ({
    root: {
      margin: "5px 20px",  
      width: 'auto',
    },
    table: {
      minWidth: 200,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
});

class BidTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 5,
        };
        this.handleChangePage =this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this); 
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.loadData();
        }
    }
    
    loadData(){
        fetch(`/api/bids/${this.props.id}`,{
            method: 'GET',
        }).then(response => response.json()).then(data => {
            this.setState({data: data.records });
        }).catch(err =>{
            console.log(err.message);
        }); 
    }
    handleChangePage (event, page) {
        this.setState({ page });
      }
    
    handleChangeRowsPerPage (event) {
        this.setState({ rowsPerPage: event.target.value });
    }

    render(){
        const { classes } = this.props;
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return(
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{`#`}</TableCell>
                                <TableCell>Bidder</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TableRow key={n._id}>
                                        <TableCell component="th" scope="row">
                                            {n._id}
                                        </TableCell>
                                        <TableCell>{n.bidder.name}</TableCell>
                                        <TableCell>{n.value}</TableCell>
                                        {/* <TableCell>{n.category.name}</TableCell> */}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={4}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={()=> this.handleChangePage()}
                                    onChangeRowsPerPage={()=>this.handleChangeRowsPerPage()}
                                    // ActionsComponent={PaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
             </Paper>            
        );
    }
}

export default withStyles(styles)(BidTable); 