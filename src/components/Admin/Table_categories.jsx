import React from 'react'; 
import {MdDelete} from 'react-icons/lib/md'; 
import {
Button,
Table
} from 'reactstrap';    

const CategoryRow = (props) => {
    function onClickDelete(){
      props.deleteCategory(props.item._id);
    }
      return(
        <tr>
            <td scope="row">{props.item.name}</td>
            <td><Button onClick={onClickDelete}><MdDelete/></Button></td>
        </tr>   
      );
  }
  
const CategoryTable = (props) => {
    const itemRows = props.items.map(item => <CategoryRow key={item._id} item={item} deleteCategory={props.deleteCategory}/>);
      return(
          <Table className="m-0 p-0 text-white bg-info" responsive>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Actions</th>
  
                  </tr>
              </thead>
              <tbody>
                  {itemRows}
              </tbody>
          </Table>
          );
  }

export default CategoryTable