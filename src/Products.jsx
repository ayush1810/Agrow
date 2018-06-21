import React from 'react';
import {
Container, Row,Col,Button, Fade,
Card, CardImg, CardText, CardBody,
CardTitle, CardSubtitle
} from 'reactstrap';
import {MdDelete} from 'react-icons/lib/md'; 

const ItemCard = (props) => {
    return(
                <div>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/890507/pexels-photo-890507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.item.name}</CardTitle>
          <CardSubtitle> <span className="font-italic">By{`  `}</span> {props.item.seller.name}</CardSubtitle>
          <CardText>
              Quantity: {props.item.quantity}{`\n`}
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
                    <Row className="my-0 py-0 px-auto text-center">        
                        <h4> Items on Sale </h4> 
                        <hr/>
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