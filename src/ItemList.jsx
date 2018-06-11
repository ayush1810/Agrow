import React from 'react';
import ItemAdd from './ItemAdd.jsx';
import ItemFilter from './ItemFilter.jsx';

const ItemRow = (props) => (
    <tr>
        <td >{props.item._id}</td>
        <td >{props.item.name}</td>
        <td >{props.item.quantity}</td>
        <td >{props.item.rate}</td>
    </tr>   
)

function ItemTable (props){
    const itemRows = props.items.map(item => <ItemRow key={item._id} item={item}/>) ; 
    return(
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>
                {itemRows}
            </tbody>
        </table>
        );
    }

export default class ItemList extends React.Component{
    constructor(){
        super();
        this.state = {items : []};
        this.createItem = this.createItem.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch('/api/items').then(response => response.json()).then(data => {
            this.setState({ items : data.records }); 
        }).catch(err =>{
            console.log(err);
        });
    }

    createItem(newItem){
        this.loadData();
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
                <h4>Welcome to ItemList</h4>
                <ItemFilter/> 
                <hr/>
                <ItemTable items={this.state.items}/>
                <hr/>
                <ItemAdd createItem={this.createItem} />
            </div>
        );
    }
}