import React from 'react';
import {Container, Row,Col, Table,Button, Fade} from 'reactstrap';
import {MdDelete} from 'react-icons/lib/md'; 

const ItemRow = (props) => {
    return(
        <tr>
            <td scope="row">{props.item.name}</td>
            <td>{props.item.quantity}</td>
            <td>{props.item.rate}</td>
            <td>{props.item.seller.name}</td>  
        </tr>   
    );
}

function ItemTable (props){
    const itemRows = props.items.map(item => <ItemRow key={item._id} item={item}/>) ; 
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
                <Container className="px-auto bg-white">
                    <Row className="my-0 py-0 px-auto text-center">        
                        <h4 className="text-center"> Items on Sale </h4> 
                        <hr/>
                     </Row>
                     <Row>
                        <ItemTable items={this.state.items}/>
                        <hr/>
                    </Row>
                </Container>
            </div>    
        );
    }
}