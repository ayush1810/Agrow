/*jshint esversion:6*/
const contentNode = document.getElementById('contents');

class ItemFilter extends React.Component {
    render() {
      return (
        <div>
            hmm
        </div>
      )
    }
}

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

class ItemAdd extends React.Component{
    constructor(){
        super();
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleSubmit(e){
    //     e.preventDefault();
    //     var form = document.forms.itemAdd;
    //     this.props.createItem({
    //         name : form.name.value,
    //         quantity : form.quantity.value,
    //         rate : form.rate.value,
    //     });
    //     //Clear the form
    //     form.name.value = '';
    //     form.quantity.value = '';
    //     form.rate.value = '';
    // }
    render(){
        return(
            <div>
                {/* <form name='itemAdd' onSubmit={this.handleSubmit}> */}
                <form name="itemAdd">
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="quantity" placeholder="Quantity"/>
                    <input type="text" name="rate" placeholder="Rate"/>
                    <button>Add Item</button>
                </form>
            </div>
        );
    }
}
class ItemList extends React.Component{
    constructor(){
        super();
        this.state = {items : []};
        // this.createItem = this.createItem.bind(this);
    }

    componentDidMount(){
        console.log("onme");
        this.loadData();
    }

    loadData(){
        console.log('tired');
        // const newItem1 = {_id: 420,name: 'Ayush',quantity:100,rate:40,};
        // const newItem2 = {_id: 5330,name: 'Aysh',quantity:10,rate:50,};
        // const newItem = this.state.items.concat(newItem1).concat(newItem2);
        // this.setState({items: newItem});
        fetch('/api/items').then(response => response.json()).then(data => {
            //console.log("Total count:", data._metadata.total);
            console.log("All good here");
            this.setState({ items : data.records }); 
        }).catch(err =>{
            console.log(err);
        });
    }

    // createItem(newItem){
    //     fetch('/api/items',{
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body : JSON.stringify(newItem),
    //     }).then(response => response.json()).then(updatedItem => {
    //            const newItems  = this.state.items.concat(updatedItem);
    //            this.setState({items:newItems});
    //     }).catch(err =>{
    //         alert("Error in sending data to server" + err.message);
    //     })
    // }

    render(){
        return(
            <div>
                <h4>Welcome to ItemList</h4>
                <ItemFilter/> 
                <hr/>
                <ItemTable items={this.state.items}/>
                <hr/>
                <ItemAdd/>
                {/* <ItemAdd createItem={this.createItem} /> */}
            </div>
        );
    }
}
ReactDOM.render(<ItemList/>,contentNode);