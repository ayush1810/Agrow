import React from 'react'; 
import {Container, Row, Col, Button, ButtonGroup, Fade} from 'reactstrap';

const showTable = (props) => {
    return(
        <Table className="ml-3 text-dark bg-transparent" responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Seller</th>
                </tr>
            </thead>
            <tbody>
                {itemRows}
            </tbody>
        </Table>
        );
}

export default class AdminDB extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      fadeCategory: false, 
      fadeProducts: false, 
      fadeSellers: false, 
    };
    
    this.toggleCategory = this.toggleCategory.bind(this); 
    this.toggleProduct = this.toggleProduct.bind(this); 
    this.toggleSeller = this.toggleSeller.bind(this); 
  }

  toggleCategory(){
    if (this.state.fadeProducts) {
    this.setState({fadeProducts : false});
    }
    if (this.state.fadeSellers) {
      this.setState({fadeSellers : false});
    }
    this.setState({fadeCategory : !this.state.fadeCategory}); 
  }
  toggleProduct(){
    if (this.state.fadeCategory) {
      this.setState({fadeCategory : false});
    }
    if (this.state.fadeSellers) {
        this.setState({fadeSellers : false});
    }
    this.setState({fadeProducts : !this.state.fadeProducts}); 
  }
  toggleSeller(){
    if (this.state.fadeProducts) {
      this.setState({fadeProducts : false});
    }
    if (this.state.fadeCategory) {
        this.setState({fadeCategory : false});
    }
    this.setState({fadeSellers : !this.state.fadeSellers}); 
  }
  render(){
    return(
      <Container>
        <Row> 
          <ButtonGroup> 
          <Button color="info" size="sm" onClick={this.toggleCategory}>Categories</Button>
          <Button color="info" size="sm" onClick={this.toggleProduct}>Items</Button>
          <Button color="info" size="sm" onClick={this.toggleSeller}>Sellers</Button>
          </ButtonGroup> 
        </Row> 
        <Row>
          <Fade in={this.state.fadeCategory} tag="h5" className="mt-3">
            Have to show categories with form here! 
          </Fade>
          <Fade in={this.state.fadeProducts} tag="h5" className="mt-3">
            Have to show products with category plus a form here! 
          </Fade>
          <Fade in={this.state.fadeSellers} tag="h5" className="mt-3">
            Have to show CRUD commands for sellers.  
          </Fade>
        </Row>
      </Container>
    );
  }
}