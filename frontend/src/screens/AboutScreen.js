import React from 'react'
import '../styles/about.css'
import {Row, Col} from 'react-bootstrap'
import image from "./Gradient3.jpg"

const AboutScreen = () => {
    return (
    <div className="mainContent">
        <img src={image} alt=""  className = "mainAbout"></img>
        
        <Row className="justify-content-md-center">
            <Col xs lg="4" className="infoAbout">
            <strong>What is digital clothing?</strong>
            Digital clothing is clothing that exists exclusively in digital format, that is, in the format of 3D models. Such clothes are added to the users’ photo </Col>
            <Col xs lg="4" className="infoAbout">
            <strong>What is the reason for developing digital clothing?</strong>
            The relevance of the development is based on problems related to the environmental and epidemiological situation in the world, in particular, problems related to the production, transportation and subsequent sale of clothing.
            </Col>
            <Col xs lg="4" className="infoAbout">
            <strong> What is the purpose of the development?</strong>
            The goals of the development are to reduce the use of natural resources in the production of digital clothing, to ensure the safe fitting of clothing during the quarantine period, and to enable users who care about their image on social networks to purchase a digital clothes          </Col>
        </Row>
    </div>
    )
}

export default AboutScreen
