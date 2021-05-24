import React from 'react'
import image1 from '../images/1.png'
import image2 from '../images/2.png'
import image3 from '../images/3.png'
import image4 from '../images/4.png'
import image5 from '../images/5.png'
import image6 from '../images/6.png'
import image7 from '../images/7.png'
import image8 from '../images/8.png'
import image9 from '../images/9.png'
import image10 from '../images/10.png'
import image11 from '../images/11.png'
import image12 from '../images/12.png'
import image13 from '../images/13.png'
import image14 from '../images/14.png'
import image15 from '../images/15.png'
import image16 from '../images/16.png'
import "./styles.css"
import { Row, Col} from 'antd';
import { useTranslation } from 'react-i18next'

const HomeScreen = () => {
    const { t } = useTranslation()
    return (
    <div>
        <Row>
            <h3>{t('Gallery of digital clothes examples.1')}</h3> 
        </Row>
        <Row>
            <Col>
                <img src={image1} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image2} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image3} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image4} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image4} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image5} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image6} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image7} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image8} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image9} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image10} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image11} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image12} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image13} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image14} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image15} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image16} alt="this is car image" className="imageList"/>
            </Col>
        </Row>
    </div>
    )
}

export default HomeScreen
