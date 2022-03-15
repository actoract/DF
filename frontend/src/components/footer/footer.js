import React, {useState} from 'react'
import {Row, Col, message, Button} from 'antd'
import './footer.css'
import 'antd/dist/antd.css';
import end from './End_5.png';
import Behance from './Behance.png';
import Linkedin from './Linkedin.png';
import Email from './Email.png';
import Github from './github.png';
import {BrowserView, MobileView} from 'react-device-detect';

const Footer = ({children}) => {
    function showMessage(){
        message.success({
            content: 'EMAIL: chuprina@kth.se',
            className: 'custom-class',
            type: 'info',
            style: {
            marginTop: '50vh',
            },
        });
    }


    return (
        <div className="footer">
            <img src={end} alt="this is image"  className = 'image'/> 
            <Row className="images">
                <Col> 
                    <a href="https://www.behance.net/annachuprina"><img src={Behance} alt="this is image"  className = 'link'/></a>
                </Col>
                <Col>
                    <a href="https://www.linkedin.com/in/anna-chuprina-766318228/"><img src={Linkedin} alt="this is image"  className = 'link'/></a>
                </Col>
                <Col>
                    <img src={Email} alt="this is image"  className = 'link' onClick={showMessage}/>
                </Col>
                <Col>
                    <a href="https://github.com/actoract"><img src={Github} alt="this is image"  className = 'link'/> </a>
                </Col>
            </Row>
        </div>
    )
}
export default Footer
