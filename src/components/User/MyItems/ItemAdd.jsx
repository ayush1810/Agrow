import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

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
            dateEnd: form.date.value,
            seller: this.props.sellerId ,
        });
        form.name.value = '';
        form.quantity.value = '';
        form.rate.value = '';
        form.date.value = '';
    }
    render(){
        return(
            <Form inline name="itemAdd" onSubmit={this.handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label hidden for="AddItemFormName" className="mr-sm-2">Name</Label>
                    <Input type="text" name="name" id="AddItemFormName" placeholder="Item Name" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label hidden for="AddItemFormQuantity" className="mr-sm-2">Quantity</Label>
                    <Input type="text" name="quantity" id="AddItemFormQuantity" placeholder="Quantity (Kg)" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label hidden for="AddItemFormRate" className="mr-sm-2">Starting Bid</Label>
                    <Input type="text" name="rate" id="AddItemFormRate" placeholder="Rate per Kg" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label hidden for="AddItemFormDeadline" className="mr-sm-2">End Bid On:</Label>
                    <Input type="date" name="date" id="AddItemFormDeadline" placeholder="DD/MM/YY" />
                </FormGroup>
                <Button>Add Item</Button>
            </Form>
        );
    }
}