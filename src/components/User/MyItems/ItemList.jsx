import React from 'react';
import {
Container, Row,Col, Table,Button, Fade,
Card, CardImg, CardText, CardBody,
CardTitle, CardSubtitle
} from 'reactstrap';
import {MdDelete, MdModeEdit} from 'react-icons/lib/md'; 
import ItemAdd from './ItemAdd.jsx';

const ItemCard = (props) => {
    function onClickDelete(){
        props.deleteItem(props.item._id);
    }

    return(
                <div>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/890507/pexels-photo-890507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.item.name}</CardTitle>
          <CardText>
              Quantity: {props.item.quantity}
              <br/>
              Rate: {props.item.rate}
          </CardText>
          <Button onClick={onClickDelete}><MdDelete/>Delete</Button>
          <Button className="mx-2"><MdModeEdit/>Edit</Button>
        </CardBody>
      </Card>
    </div>
    );
}

const ItemTable = (props) => {
    return(
props.items.map((item) =>{
    return(
        <Col key={item._id} md='3' sm="4"> 
        <ItemCard item={item} deleteItem={props.deleteItem}/>
        </Col> 
    );
})
    );
}

export default class ItemList extends React.Component{
    constructor(){
        super();
        this.state = {
            fadeIn : false,
            sellerID:null,
            items : []
        };
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this); 
        this.toggleAddItem = this.toggleAddItem.bind(this);
    }

    toggleAddItem() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    componentDidMount(){
        this.setState({
            sellerID : this.props.userid
        });
        this.loadData(this.props.userid);
    }

    loadData(uid){
        fetch(`/api/seller/${uid}`,{
            method: 'GET',
        }).then(response => response.json()).then(data => {
            this.setState({items: data.records });
        }).catch(err =>{
            console.log(err.message);
        });
    }

    createItem(newItem){
        fetch('/addItem',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(newItem),
        }).then(response => response.json()).then(updatedItem => {
               const newItems  = this.state.items.concat(updatedItem);
               this.setState({items:newItems});
        }).catch(err =>{
            alert(err.message);
        });
    }
    deleteItem(itemid){
        fetch(`/deleteItem/${itemid}`,{method: 'DELETE'})
        .then(response => {
            this.loadData(this.props.userid);
        });
    }

    render(){
        return(
            <div>
                <Container className="p-4" style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <Row>
                        <ItemTable items={this.state.items} deleteItem={this.deleteItem}/>
                        <hr/>
                    </Row>
                    <Row className="my-2">
                        <Button color="success" size="sm" onClick={this.toggleAddItem}>Add Item</Button>
                        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                            <ItemAdd createItem={this.createItem} sellerId={this.state.sellerID}/>
                        </Fade>
                    </Row>    
                </Container>
            </div>    
        );
    }
}