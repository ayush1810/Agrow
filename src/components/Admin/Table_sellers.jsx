import React from 'react';
import {MdDelete,MdAttachMoney} from 'react-icons/lib/md'; 
import {
Button,
Table,
Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

const SellerRow = (props) => {
    function onClickDelete(){
      props.deleteSeller(props.item._id);
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
  
class SellerTable extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            sellerWalletModal: false,
            sID: null 
        };
        this.onSubmitSellerWallet = this.onSubmitSellerWallet.bind(this); 
        this.toggleWalletModal = this.toggleWalletModal.bind(this);
        this.openWalletModal = this.openWalletModal.bind(this);
    }

    onSubmitSellerWallet(e){
        e.preventDefault(); 
        var form = document.forms.ModifySellerWalletForm; 
        this.props.UpdateWallet(
            this.state.sID, 
            {
                wallet : form.balance.value
            }
        );
        form.balance.value = '';
        this.toggleWalletModal();
    }

    openWalletModal(sid){
        this.setState({
            sellerWalletModal : !this.state.sellerWalletModal,
            sID : sid
        });
    }
    toggleWalletModal(){
        this.setState({sellerWalletModal: !this.state.sellerWalletModal});
    }
    render(){ 
    return(
        <div>
          <Table className="m-0 p-0 text-white bg-danger" responsive>
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
                  {this.props.sellers.map(item => <SellerRow key={item._id} item={item} UpdateWallet={this.openWalletModal} />)}
              </tbody>
          </Table>
          <Modal isOpen={this.state.sellerWalletModal}>
          <form name='ModifySellerWalletForm' onSubmit={this.onSubmitSellerWallet}>
                  <ModalHeader>Update Wallet</ModalHeader>
                  <ModalBody>
                      <p> Seller ID: {this.state.sID} </p> 
                      <div className="row">
                          <div className="form-group col-md-4">
                              <label>Amount</label>
                              <input type="number" name="balance" className="form-control" />
                          </div>
                      </div>
                  </ModalBody>
                  <ModalFooter>
                      <input type="submit" value="Update Wallet" color="primary" className="btn btn-primary"/>
                      <Button color="danger" onClick={this.toggleWalletModal}>Close</Button>
                  </ModalFooter>
                  </form>
          </Modal>
          </div>
          );
        }
}
  
export default SellerTable