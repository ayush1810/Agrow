import React from "react";
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    imgRounded:{
        height: "25px",
        width: "40px",
        borderRadius: "6px !important"
    }
});

class CustomerSection extends React.Component{
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

    loadData(){
        fetch('/api/customers',{
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
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TableRow key={n._id}>
                                        <TableCell component="th" scope="row">{n.name}</TableCell>
                                        <TableCell>{n.email}</TableCell>
                                        <TableCell>{n.wallet}</TableCell>
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
                                    colSpan={3}
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
export default withStyles(styles)(CustomerSection); 