import React from 'react';
import {MdDelete} from 'react-icons/lib/md'; 
import {
Button,
Table
} from 'reactstrap';

const ProductRow = (props) => {
    function onClickDelete(){
      props.deleteProduct(props.item._id);
    }
      return(
        <tr>
          <td>
            <img src={props.item.image} alt="Pic" className="img-fluid img-thumbnail" />
          </td>
            <td scope="row">{props.item.name}</td>
            <td>{props.item.description}</td>
            <td>{props.item.category.name}</td> 
            <td><Button onClick={onClickDelete}><MdDelete/></Button></td>
        </tr>   
      );
  }
  
  const ProductTable = (props) => {
    const productRows = props.items.map(item => <ProductRow key={item._id} item={item} deleteProduct={props.deleteProduct}/>);
      return(
          <Table className="m-0 p-0 text-white bg-danger" responsive>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {productRows}
              </tbody>
          </Table>
          );
  }
  
export default ProductTable  