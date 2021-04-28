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
import {addOrder} from '../actions/orderActions'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'

const PlaceorderScreen = ({history}) => {
    const orderAdd = useSelector(state => state.orderAdd)
    const {loading, order, success, error} = orderAdd
    const dispatch = useDispatch();
    const { t } = useTranslation(); 
    const cart = useSelector(state => state.cart)
    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        else if (error){
            message.error(error, 3);
        }
    },[history, success])
    const hadlePlaceOrder = () => {
        dispatch(addOrder({
            orderItems: cart.cartItems,
            deliveryAddress: cart.deliveryAddress,
            paymentMethod: cart.paymentMethod
        }))
    }
    return (
        <>
        <Row className = 'justify-content-md-center'>
            <StepsComp step4/>
        </Row>
        <div className = "mainProduct"> 
          <Row>
            <div className = "CardDetails cart">
                <div className = "text_details"><strong>{t('Shipping address.1')}: </strong> 
                  {cart.deliveryAddress.address},
                    {cart.deliveryAddress.city},
                    {cart.deliveryAddress.postCode},
                    {cart.deliveryAddress.country}</div>
                <div className = "text_details"><strong>{t('Payment method.1')}: </strong> {cart.paymentMethod}</div>
                <div className = "text_details"><strong>{t('Cart items.1')}: </strong></div>
                <ListGroup.Item>
                {cart.cartItems.length === 0? alert("Empty cart") : (
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name.nameRus} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.type === "dc" ? "Digital clothes" : "Real clothes"}
                                    </Col>
                                    <Col md={2}>
                                        {item.type === "dc" ? <Image src={item.custImage} alt={item.name.nameRus} fluid rounded></Image> : <div/>}
                                    </Col>
                                    <Col md={2}>
                                        {item.qty} x {item.price} = {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                </ListGroup.Item>
            </div>
            <Col md={3}>
                <div className = "CardDetails2" >
                    <p><strong>{t('ORDER SUMMERY.1')}:</strong></p>
                    <p><strong>{t('Total number.1')}:</strong> {cart.cartItems.reduce((acc, current) => acc + current.qty, 0)}</p>
                    <p><strong>{t('Total price.1')}:</strong> {cart.cartItems.reduce((acc, current) => acc + Number(current.price), 0)}</p>
                    <div className = 'nav-but2' onClick = {hadlePlaceOrder}>{t('place order.1')}</div>  
                </div>
            </Col>
          </Row>
        </div>
        </>
    )
}
export default PlaceorderScreen
