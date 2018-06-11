import AddUser from './signUp.jsx';
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        var form = document.forms.itemAdd;
        this.props.createItem({
            name : form.name.value,
            quantity : form.quantity.value,
            rate : form.rate.value,
        });
        //Clear the form
        form.name.value = '';
        form.quantity.value = '';
        form.rate.value = '';
    }
    render(){
        return(
            <div>
                <form name='itemAdd' onSubmit={this.handleSubmit}> 
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
ReactDOM.render(<ItemList/>,contentNode);