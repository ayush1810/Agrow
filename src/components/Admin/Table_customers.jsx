import React from 'react';
import {MdDelete,MdAttachMoney} from 'react-icons/lib/md'; 
import {
Button,Table,
Modal, ModalBody, ModalFooter, ModalHeader,
Form, FormGroup, Label, Input
} from 'reactstrap';

const CustomerRow = (props) => {
    function onClickDelete(){
     // props.deleteSeller(props.item._id);
    }

    function onClickWallet(){
       props.UpdateWallet(props.item._id);
    }
    return(
        <tr>
            <td scope="row">{props.item.name}</td>
            <td>{props.item.email}</td>
            <td>{props.item.wallet}</td> 
            <td>Items</td>
            <td>
                <Button onClick={onClickDelete}><MdDelete/></Button>
                <Button onClick={onClickWallet}><MdAttachMoney/></Button>
            </td>
        </tr>   
      );
}
  
class CustomerTable extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            sellerWalletModal: false,
            cID: null 
        };
        this.onSubmitSellerWallet = this.onSubmitSellerWallet.bind(this); 
        this.toggleWalletModal = this.toggleWalletModal.bind(this);
        this.openWalletModal = this.openWalletModal.bind(this);
    }

    onSubmitSellerWallet(e){
        e.preventDefault(); 
        var form = document.forms.ModifySellerWalletForm; 
        // this.props.UpdateWallet(
        //     this.state.sID, 
        //     {
        //         wallet : form.balance.value
        //     }
        // );
        form.balance.value = '';
        this.toggleWalletModal();
    }

    openWalletModal(sid){
        this.setState({
            sellerWalletModal : !this.state.sellerWalletModal,
            cID : sid
        });
    }
    toggleWalletModal(){
        this.setState({sellerWalletModal: !this.state.sellerWalletModal});
    }
    render(){ 
    return(
        <div>
          <Table className="m-0 p-0 text-danger bg-success" responsive>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Wallet</th>
                      <th>Items</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {this.props.customers.map(item => <CustomerRow key={item._id} item={item} UpdateWallet={this.openWalletModal} />)}
              </tbody>
          </Table>
          <Modal isOpen={this.state.sellerWalletModal}>
                  <ModalHeader>Update Wallet</ModalHeader>
                  <Form name='ModifySellerWalletForm' onSubmit={this.onSubmitSellerWallet}>
                  <ModalBody>
                     <p> Seller ID: {this.state.sID} </p> 
                      <FormGroup>
                            <Label hidden for="WalletAmount">Amount : </Label>
                            <Input type="number" step="0.01" name="balance" id="WalletAmount" placeholder="00.00" />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary">Update Wallet</Button>
                      <Button color="danger" onClick={this.toggleWalletModal}>Close</Button>
                  </ModalFooter>
                  </Form>
          </Modal>
          </div>
          );
        }
}
  
export default CustomerTable