import React from 'react';
import {Jumbotron,Card, CardText, CardTitle, Container, Row, Col, Button} from 'reactstrap';

import ItemTable from './MyItems/ItemList.jsx';

export default class UsersInfo extends React.Component{
    constructor(props, context){
        super(props,context);   
    }
    componentDidMount(){
        // const { match, history} = this.props;
//        this.setState({username: this.props.state.user.name});
        alert("Welcome home, "+ this.props.user.name);
    }
    render(){
        return(
            <div>
                <Container fluid>
                    <Row>
                        <Container fluid>   
                    <Jumbotron fluid className="py-1 px-2">
                        <Container fluid>   
                            <h4 className="display-4">Hello, User!</h4>
                            <p className="lead">Welcome to the Dashboard. You can Watch, Add & Edit items.</p>
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
                                <CardTitle>Your Profile</CardTitle>
                                <CardText>Details coming soon.</CardText>
                                <Button>More</Button>
                            </Card>
                        </Col>
                   </Row>
                </Container>
            </div>
        );
    }
}