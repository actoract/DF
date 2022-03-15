import React from 'react'
import './message.css';
import {Row, Col, ListGroup, Image, Form, Card, Container} from 'react-bootstrap'
import smile from './smile.jpg';

const Message = ({ children}) => {
    return (
        <>
            <Container  className = "EmptyStore">
                <Row className="justify-content-md-center">
                    <img src={smile} />
                    <h5>
                    {children}
                    </h5>
                </Row>
                </Container>
        </>
    )
}
export default  Message
