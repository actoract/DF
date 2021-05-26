import React from 'react'
import './message.css';
import {Row, Col, ListGroup, Image, Form, Card, Container} from 'react-bootstrap'
import smile from './smile.jpg';

const Message = ({ children}) => {
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <img src={smile}  className = "EmptyStore"/>
                </Row>
                <Row className="justify-content-md-center">
                    <h5>
                    {children}
                    <span>
                    </span>
                    </h5>
                </Row>
                </Container>
        </>
    )
}
export default  Message
