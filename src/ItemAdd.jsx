import React from 'react';

export default class ItemAdd extends React.Component{
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