import React from 'react';
import { 
Row, Col, Button,
Container,Jumbotron, 
} from 'reactstrap'; 
import ProductList from './Products.jsx';

export default class HomePage extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
          <Container fluid className="px-auto">
          <Jumbotron className='bg-transparent text-center'>
          <Container>
            <h1 className="font-weight-bold">Agrow</h1>
            <p className="lead text-white">An experimental bidding project</p>
            <p>
              <Button color="info">Login</Button>
              <Button color="warning" className="mx-2">Signup</Button>
            </p>
          </Container>
        </Jumbotron>
        <ProductList/>
      </Container>
       );
    }
}