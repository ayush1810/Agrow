import React from 'react'; 
import classnames from 'classnames'; 
import {
Container, Row, Col, 
Button,
Form, FormGroup, Label, Input,
TabContent, TabPane, Nav, NavItem, NavLink, 
} from 'reactstrap';

import CategoryTable from './Table_categories.jsx';
import ProductTable from './Table_products.jsx';
import SellerTable from './Table_sellers.jsx';
import CustomerTable from './Table_customers.jsx'; 

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


const AddProduct = (props) => {
  
  function handleAddProduct(e){
    e.preventDefault(); 
    var form = document.forms.productAdd;
    props.AddProduct({
        name : form.name.value,
        category: form.selectcategory.value
    });
    form.name.value = '';
    form.selectcategory.value = '';
  }

  const CategoryOptions = props.categories.map((category)=> <option key={category._id} value={category._id}>{category.name}</option> );
  
  return(
    <Form inline name="productAdd" onSubmit={handleAddProduct}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label hidden for="ProductName" className="m-0">Name</Label>
          <Input type="text" name="name" id="ProductName" placeholder="Product Name" />
      </FormGroup>
      <FormGroup>
        <Label hidden for="ProductCategory">Category</Label>
        <Input type="select" name="selectcategory" id="ProductCategory">
          {CategoryOptions}
        </Input>
      </FormGroup>
      <Button color="primary">Add Product</Button>
    </Form>
  );
}

export default class AdminDB extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      activeTab: '1',
      categories: [],
      products: []
    };

    this.onToggle = this.onToggle.bind(this);
    this.loadCategories = this.loadCategories.bind(this);
    this.addCategory = this.addCategory.bind(this); 
    this.deleteCategory = this.deleteCategory.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.addProduct = this.addProduct.bind(this); 
    this.deleteProduct = this.deleteProduct.bind(this);
    this.loadSellers = this.loadSellers.bind(this);
    this.loadCustomers = this.loadCustomers.bind(this);
  }

  componentDidMount(){
    this.loadCategories();
  }

  loadSellers(){

  }

  loadCustomers(){

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

  onToggle(t){
    if(this.state.activeTab !== t){
      this.setState({
        activeTab: t
      });
    }
  }

  render(){
    return(
      <Container>
        <Row>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.loadCategories(); this.onToggle('1'); }}
            >
              Category
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.loadProducts() ;this.onToggle('2'); }}
            >
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.loadSellers(); this.onToggle('3'); }}
            >
              Sellers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.loadCustomers(); this.onToggle('4'); }}
            >
              Customers
            </NavLink>
          </NavItem>
        </Nav>
        </Row>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col xs='12' md='6' >
                <CategoryTable items={this.state.categories} deleteCategory={this.deleteCategory} />
                <AddCategory AddCategory={this.addCategory} />
              </Col> 
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
          <Col xs='12' md='6' >
            <ProductTable items={this.state.products} deleteProduct={this.deleteProduct} />
            <AddProduct AddProduct={this.addProduct} categories={this.state.categories}/>
          </Col> 
          </Row>
          </TabPane>
          <TabPane tabId="3">
          <Row>
          <Col xs='12' md='6' >
            Sellers here!
          </Col> 
          </Row>
          </TabPane>
          <TabPane tabId="4">
          <Row>
          <Col xs='12' md='6'>
          Customers Hereee.
          </Col> 
          </Row>
          </TabPane>
        </TabContent>

      </Container>
    );
  }
}