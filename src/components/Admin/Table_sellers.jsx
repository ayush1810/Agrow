import React from 'react';
import {MdDelete} from 'react-icons/lib/md'; 
import {
Button,
Table
} from 'reactstrap';

const SellerRow = (props) => {
    function onClickDelete(){
      props.deleteSeller(props.item._id);
    }
      return(
        <tr>
            <td scope="row">{props.item.name}</td>
            <td>{props.item.email}</td>
            <td>{props.item.city}</td> 
            <td>Items</td>
            <td><Button onClick={onClickDelete}><MdDelete/></Button></td>
        </tr>   
      );
  }
  
const SellerTable = (props) => {
    const sellerRows = props.sellers.map(item => <SellerRow key={item._id} item={item} deleteSeller={props.deleteSeller}/>);
      return(
          <Table className="m-0 p-0 text-white bg-danger" responsive>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Items</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {sellerRows}
              </tbody>
          </Table>
          );
}
  
export default SellerTable