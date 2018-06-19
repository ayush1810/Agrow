import React from 'react';
import {Container, Row,Col, Table,Button, Fade} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';

import ItemAdd from './ItemAdd.jsx';
import ItemFilter from './ItemFilter.jsx';

const ItemRow = (props) => (
    <tr>
        <td scope="row">{props.item._id}</td>
        <td>{props.item.name}</td>
        <td>{props.item.quantity}</td>
        <td>{props.item.rate}</td>
        <td><FontAwesomeIcon icon={faTrash} /> </td>  
    </tr>   
)

function ItemTable (props){
    const itemRows = props.items.map(item => <ItemRow key={item._id} item={item}/>) ; 
    return(
        <Table dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {itemRows}
            </tbody>
        </Table>
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
        fetch('/api/items',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({userid:uid}),
        }).then(response => response.json()).then(data => {
            this.setState({items: data.records });
        }).catch(err =>{
            console.log(err.message);
        });
      }
        // fetch('/api/items').then(response => response.json()).then(data => {
        //     this.setState({ items : data.records }); 
        // }).catch(err =>{
        //     console.log(err);
        // });

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

    render(){
        return(
            <div>
                <Container className="p-4" style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <Row>        
                        <ItemFilter/> 
                        <hr/>
                     </Row>
                     <Row>
                        <ItemTable items={this.state.items}/>
                        <hr/>
                    </Row>
                    <Row>
                        <Button color="primary" size="sm" onClick={this.toggleAddItem}>Add Item</Button>
                        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                            <ItemAdd createItem={this.createItem} sellerId={this.state.sellerID}/>
                        </Fade>
                    </Row>    
                </Container>
            </div>    
        );
    }
}