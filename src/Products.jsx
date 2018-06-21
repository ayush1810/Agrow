import React from 'react';
import {
Container, Row,Col,Button, Fade,
Card, CardImg, CardText, CardBody,
CardTitle, CardSubtitle
} from 'reactstrap';

const ProductFilter = (props) => {
    return(
        <div>
            <Button size="md">Fruits</Button>{' '}
            <Button size="md">Veggies</Button>{' '}
            <Button size="md">Others</Button>{' '}
        </div>
    )
}

const ItemCard = (props) => {
    return(
                <div>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/42164/pexels-photo-42164.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.item.name}</CardTitle>
          <CardSubtitle> <span className="font-italic">By{`  `}</span> {props.item.seller.name}</CardSubtitle>
          <CardText>
              Quantity: {props.item.quantity}
              <br/>
              Rate: {props.item.rate}
          </CardText>
          <Button>Add Bid</Button>
        </CardBody>
      </Card>
    </div>
    );
}

const ItemTable = (props)=>{
    return (
    props.items.map((item) =>{
        return(
            <Col key={item._id} md='3' sm="4"> 
            <ItemCard item={item}/>
            </Col> 
        );
    }) 
    );
}   

export default class ProductList extends React.Component{
    constructor(){
        super();
        this.state = {
            items : []
        };
    }
    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch('/api/items',{method: 'GET'}).then(response => response.json()).then(data => {
            this.setState({items: data.items});
        }).catch(err =>{
            console.log(err.message);
        });
    }

    render(){
        return(
            <div>
                <Container fluid className="p-4 m-0 bg-white">
                    <Row className="mb-4 py-0 pl-5">        
                       <ProductFilter/>
                     </Row>
                     <Row>
                        <ItemTable items={this.state.items}/>
                        <hr/>
                    </Row>
                    <Row>
                        
                    </Row>
                </Container>
            </div>    
        );
    }
}