import React from 'react'; 
import {
Container, Row, Col, Button,
Form, Table, FormGroup, Label, Input
} from 'reactstrap';
import {MdDelete} from 'react-icons/lib/md'; 

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
      <Button color="danger">Add Category</Button>
    </Form>
  );
}

const ProductRow = (props) => {
  function onClickDelete(){
    props.deleteProduct(props.item._id);
  }
    return(
      <tr>
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

const AddProduct = (props) => {

  function handleAddProduct(e){
    e.preventDefault(); 
    var form = document.forms.productAdd;
    props.AddProduct({
        name : form.name.value,
    });
    form.name.value = '';
  }
  return(
    <Form inline name="productAdd" onSubmit={handleAddProduct}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label hidden for="ProductName" className="m-0">Name</Label>
          <Input type="text" name="name" id="ProductName" placeholder="Product Name" />
      </FormGroup>
      <Button color="primary">Add Product</Button>
    </Form>
  );
}

export default class AdminDB extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      categories: [],
      products: []
    };

    this.loadCategories = this.loadCategories.bind(this);
    this.addCategory = this.addCategory.bind(this); 
    this.deleteCategory = this.deleteCategory.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.addProduct = this.addProduct.bind(this); 
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount(){
    this.loadCategories();
    this.loadProducts();
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

  loadProducts(){
    fetch('/api/products',{
        method: 'GET',
    }).then(response => response.json()).then(data => {
        this.setState({products: data.records });
    }).catch(err =>{
        console.log(err.message);
    });
  }

  addProduct(procreds){
    fetch('/addProduct',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(procreds),
  }).then(response => response.json()).then(newProduct => {
         this.loadProducts();
  }).catch(err =>{
      alert(err.message);
  });
  }

  deleteProduct(pid){
    fetch(`/deleteProduct/${pid}`,{method: 'DELETE'})
    .then(response => response.json).then(()=>{
        this.loadProducts();
    });
  }

  render(){
    return(
      <Container>
        <Row> 
          <Col xs='12' md='6' className="px-3" >
            <AddCategory AddCategory={this.addCategory} />
          </Col> 
          <Col xs='12' md='6' >
            <AddProduct AddProduct={this.addProduct}/>
          </Col> 
        </Row> 
        <Row>
          <Col xs='12' md='6' >
            <CategoryTable items={this.state.categories} deleteCategory={this.deleteCategory} />
          </Col> 
          <Col xs='12' md='6' >
            <ProductTable items={this.state.products} deleteProduct={this.deleteProduct} />
          </Col> 
        </Row>
      </Container>
    );
  }
}