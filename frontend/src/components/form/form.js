import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import './form.css'

const FormCont = ({children}) => {
    return (
        <Container className="FormCont">
            <Row className = 'justify-content-md-center'>
                <Col xs={12} md={8}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
export default FormCont
