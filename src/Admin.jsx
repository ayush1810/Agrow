import React from 'react'; 
import {
Container, Row, Col, Button,
Form, Table, FormGroup, Label, Input
} from 'reactstrap';
import {MdDelete} from 'react-icons/lib/md'; 

const EntityRow = (props) => {
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

const EntityTable = (props) => {
  const itemRows = props.items.map(item => <EntityRow key={item._id} item={item} deleteCategory={props.deleteCategory}/>);
    return(
        <Table className="ml-3 text-dark bg-transparent" responsive>
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

const AddCategory = (props) => {

  function handleAddCategory(e){
    e.preventDefault(); 
    var form = document.forms.categoryAdd;
    props.AddCategory({
        name : form.name.value,
    });
    form.name.value = '';
  }
  return(
    <Form inline name="categoryAdd" onSubmit={handleAddCategory}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label hidden for="CategoryName" className="mr-sm-2">Name</Label>
          <Input type="text" name="name" id="CategoryName" placeholder="Category Name" />
      </FormGroup>
      <Button>Add Category</Button>
    </Form>
  );
}

export default class AdminDB extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      categories: []
    };

    this.loadCategories = this.loadCategories.bind(this);
    this.addCategory = this.addCategory.bind(this); 
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentDidMount(){
    this.loadCategories();
  }

  loadCategories(){
    fetch('/api/categories',{
        method: 'GET',
    }).then(response => response.json()).then(data => {
        this.setState({categories: data.records });
    }).catch(err =>{
        console.log(err.message);
    });
  }
  
  addCategory(catcreds){
    fetch('/addCategory',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(catcreds),
  }).then(response => response.json()).then(newCategory => {
         const newItems  = this.state.categories.concat(newCategory);
         this.setState({categories:newItems});
  }).catch(err =>{
      alert(err.message);
  });
  }

  deleteCategory(cid){
    fetch(`/deleteCategory/${cid}`,{method: 'DELETE'})
    .then(response => response.json).then(()=>{
        this.loadCategories();
    });
  }

  render(){
    return(
      <Container>
        <Row> 
          <AddCategory AddCategory={this.addCategory} />
        </Row> 
        <Row>
            <EntityTable items={this.state.categories} deleteCategory={this.deleteCategory} />
        </Row>
      </Container>
    );
  }
}