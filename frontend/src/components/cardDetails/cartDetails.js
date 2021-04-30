import React, {useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Popover, Modal } from 'antd';
import ModalMessage from "../modalMessage"
import {Link} from 'react-router-dom'

const CartDetails = ({id, text, image, uploadImage, details, type, page}) => {
    const { t } = useTranslation(); 
    const messageOnHover = (
        <div>
          <p>In order to get details click on order</p>
        </div>
      );
    
    const [isModalVis, setIsModalVisible] = useState(false);

    const showModalMessage = () => {
        setIsModalVisible(true);
    }
    return (
        <div>{   
        type === "header"?
            <Row>
                {id ? <Col md={4} className =""><strong>{id}</strong></Col>: <div/>}
                {text ? text.map(item => (<Col md={2} className =""> <strong>{item} </strong> {} </Col>)) : <div/>}
            </Row> :
            page == "user"?
            <Popover content={messageOnHover} title="How to get order details?">    
            <Link to = {`/order/${id}`}>
                <Row className = "CardDetails2 details">
                    {id ? <Col md={4}> {id}</Col>: <div/>}
                    {text ? text.map(item => 
                        item == false ? (<Col md={2}> <strong>✕</strong> {} </Col>) : 
                        item != true ? (<Col md={2}>  {item}  </Col>) : (<Col md={2}>  ✓  </Col>)) : <div/>
                    }
                </Row>
            </Link>
            </Popover> :
            <Row className = "CardDetails2 details">
                {id ? <Col md={4}> {id}</Col>: <div/>}
                {text ? text.map(item => 
                    item == false ? (<Col md={2}> <strong>✕</strong> {} </Col>) : 
                    item != true ? (<Col md={2}>  {item}  </Col>) : (<Col md={2}>  ✓  </Col>)) : <div/>
                }
            </Row>
        }
        {isModalVis ? <ModalMessage isModalVis = {isModalVis} id = {id}/> : <div/>}
        </div>
    )
}
export default CartDetails
