import React from 'react';
import { Row, Col, Container} from 'reactstrap'; 
import ProductList from './Products.jsx';

export default class HomePage extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
            <Container fluid>
              <Row>
                <Col className="display-3 my-0 py-0 px-auto text-center" style={{color:'#25a55f'}}>AGROW</Col>
              </Row>
              <Row>
                <Col className="display-5 m-0 p-0 font-italic text-center" style={{color:'#fff7c2'}}>An experimental bidding project</Col>
              </Row>
              <Row>
                <Col xs="12" className="mt-2">
                  <ProductList/>
                </Col>
              </Row>
            </Container>
        );
    }
}