import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import ItemList from '../components/itemList'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import StepsComp from '../components/steps'
import {regAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'

const PlaceorderScreen = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation(); 
    const cart = useSelector(state => state.cart)
    return (
        <>
        <Row className = 'justify-content-md-center'>
                <StepsComp step4/>
        </Row>
        <div className = "mainProduct"> 
          <Row>
            
            <div className = "CardDetails">
                <div className = "text_details"><strong>Shipping address: </strong> 
                  {cart.deliveryAddress.address},
                    {cart.deliveryAddress.city},
                    {cart.deliveryAddress.postCode},
                    {cart.deliveryAddress.country}</div>
                <div className = "text_details"><strong>Payment method: </strong> {cart.paymentMethod}</div>
                <div className = "text_details"><strong>Cart items: </strong></div>
                <ListGroup.Item>
                {cart.cartItems.length === 0? alert("Empty cart") : (
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name.nameRus} fluid rounded></Image>
                                    </Col>
                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.type === "dc" ? "Digital clothes" : "Real clothes"}
                                    </Col>
                                    <Col md={2}>
                                        {item.type === "dc" ? item.custimeImage : <div/>}
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {item.price} = {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                </ListGroup.Item>
            </div>
          </Row>
        </div>
        </>
    )
}
export default PlaceorderScreen
