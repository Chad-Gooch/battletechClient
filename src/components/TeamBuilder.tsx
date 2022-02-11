import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadOut from './LoadOut';
import {Container, Row, Col} from 'reactstrap';


export default class TeamBuilder extends Component<any,any> {
   constructor(props:any) {
       super(props)
       this.state = {
        mech1: [],
        mech2: [],
        mech3: [],
        mech4: [],
       }
    };



    render() {
        return (
            <div className="TeamBuilder">   
                <h3>TeamBuilder</h3>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
                <LoadOut />
            </div>
        );
    }
}
