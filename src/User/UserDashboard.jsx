import React from 'react';
import {Jumbotron,Card, CardText,CardBody, CardTitle, Container, Row, Col, Button} from 'reactstrap';

import ItemTable from './MyItems/ItemList.jsx';

export default class UsersInfo extends React.Component{
    constructor(props, context){
        super(props,context);   
    }
    componentDidMount(){
    }
    render(){
        return(
            <div>
                <Container className="bg-dark">
                    <Row>
                        <Container fluid>   
                    <Jumbotron fluid className="bg-dark text-white py-1 px-2">
                        <Container fluid>   
                            <p className="lead">
                                Welcome to the Dashboard, {this.props.user.name.split(' ')[0]}.
                                You can Watch, Add & Edit items.
                            </p>
                            <hr className="my-2" />
                            <p>You can also manage your finances here.</p>
                        </Container>
                    </Jumbotron>
                    </Container>
                    </Row>
                    <Row> 
                        <Col md="6">
                            <ItemTable userid={this.props.user._id}/>
                        </Col>
                        <Col md ={{size:3, order:2, offset:2}}>
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle className="text-center">Your Profile</CardTitle>
                                <CardBody className="p-0">
                                        Email:{`  `}
                                        <span className="font-weight-bold"> {this.props.user.email}</span> 
                                        <br/>
                                        Location:{` `}
                                        <span className="font-weight-bold"> {this.props.user.city}</span> 
                                        <br/>
                                    <Button>More</Button>
                                </CardBody>    
                            </Card>
                        </Col>
                   </Row>
                </Container>
            </div>
        );
    }
}