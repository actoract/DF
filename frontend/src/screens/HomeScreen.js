import React, {Suspense} from 'react'
import image1 from '../images/1-min.jpg'
import image2 from '../images/2-min.jpg'
import image3 from '../images/3-min.jpg'
import image4 from '../images/4-min.jpg'
import image5 from '../images/5-min.jpg'
import image6 from '../images/6-min.jpg'
import image7 from '../images/7-min.jpg'
import image8 from '../images/8-min.jpg'
import image9 from '../images/9-min.jpg'
import image10 from '../images/10-min.jpg'
import image11 from '../images/11-min.jpg'
import image12 from '../images/12-min.jpg'
import image13 from '../images/13-min.jpg'
import image14 from '../images/14-min.jpg'
import image15 from '../images/15-min.jpg'
import image16 from '../images/16-min.jpg'
import "./styles.css"
import { Row, Col} from 'antd';
import { useTranslation } from 'react-i18next'
const Loader = React.lazy(() => import('../components/loader'));

const HomeScreen = () => {
    const { t } = useTranslation()
    return (
    <div>
        <Suspense fallback={<Loader/>}>
        <Row>
            <h3>{t('Gallery of digital clothes examples.1')}</h3> 
        </Row>
        <Row>
            <Col>
                <img src={image1} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image2} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image3} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image4} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image4} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image5} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image6} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image7} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image8} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image9} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image10} alt="this is car image" className="imageList"/>
            </Col>
            <Col>
                <img src={image11} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image12} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image13} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image14} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image15} alt="this is image" className="imageList"/>
            </Col>
            <Col>
                <img src={image16} alt="this is image" className="imageList"/>
            </Col>
        </Row>
        </Suspense>
    </div>
    )
}

export default HomeScreen
