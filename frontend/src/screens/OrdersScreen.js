import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import ItemList from '../components/itemList'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {getOrderById} from '../actions/orderActions'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'

const OrdersScreen = ({match}) => {
    const orderId = match.params.id
    const orderDet = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDet
    const dispatch = useDispatch();
    const { t } = useTranslation(); 

    useEffect(() => {
        dispatch(getOrderById(orderId))
    },[])

    return (
        <>
        {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
        <div className = "mainProduct"> 
          <Row>
            <div className = "CardDetails">
                <div className = "text_details"><strong>{t('Shipping address.1')}: </strong> 
                    {order.deliveryAddress.address},
                    {order.deliveryAddress.city},
                    {order.deliveryAddress.postCode},
                    {order.deliveryAddress.country}</div>
                <div className = "text_details"><strong>{t('Payment method.1')}: </strong> {order.paymentMethod}</div>
                <div className = "text_details"><strong>{t('Cart items.1')}: </strong></div>
                <ListGroup.Item>
                {order.orderItems.length === 0? alert("Empty order") : (
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
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
                                        {item.type === "dc" ? <img src={item.custimeImage } alt="1" fluid rounded></img>: <div/>}
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
            <Col md={4}>
                <div className = "CardDetails2">
                    <p><strong>{t('ORDER SUMMERY.1')}:</strong></p>
                    <p><strong>{t('Total number.1')}:</strong> {order.orderItems.reduce((acc, current) => acc + current.qty, 0)}</p>
                    <p><strong>{t('Total price.1')}:</strong> {order.orderItems.reduce((acc, current) => acc + Number(current.price), 0)}</p>
                    <div className = 'nav-but2' >{t('place order.1')}</div>  
                </div>
            </Col>
          </Row>
        </div>}
        </>
    )
}
export default OrdersScreen
