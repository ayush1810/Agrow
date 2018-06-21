import React from 'react'; 
import {Container, Row, Col, Button, ButtonGroup, Fade} from 'reactstrap';

const EntityRow = (props) => {
      return(
          <tr>
              <td scope="row">{props.item.name}</td>
              <td>{props.item.quantity}</td>
              <td>{props.item.rate}</td>
              <td>{props.item.seller}</td>  
          </tr>   
      );
}

const EntityTable = (props) => {
  const itemRows = props.items.map(item => <EntityRow key={item._id} item={item}/>);
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
            <EntityTable />
          </Fade> 
        </Row>
        <Row> 
          Add Item component
        </Row>
      </Container>
    );
  }
}