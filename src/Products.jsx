import React from 'react';
import {
Container, Row,Col,Button, Fade,
Card, CardImg, CardText, CardBody,
CardTitle, CardSubtitle
} from 'reactstrap';
import {
    MdAttachMoney
} from 'react-icons/lib/md'; 
const ProductFilter = (props) => {
    return(
        <Col md={{size:3, offset:3}}>
            <Button size="md">Fruits</Button>{' '}
            <Button size="md">Veggies</Button>{' '}
            <Button size="md">Others</Button>{' '}
        </Col>
    )
}

const ItemCard = (props) => {
    return(
        <Col lg='3' md='6' xs='12' className="mx-0 my-2">
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
                    <Button><MdAttachMoney/>Add Bid</Button>
                </CardBody>
            </Card>
    </Col>
    );
}

const ItemTable = (props)=>{
    return (
    props.items.map((item) =>{
        return(
            <ItemCard key={item._id} item={item}/>
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
                <Row>
                    <ProductFilter/>
                </Row> 
                <Row>
                    <ItemTable items={this.state.items}/>
                </Row> 
            </div>    
        );
    }
}