import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import ItemList from '../components/itemList'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import Status from '../components/status'
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
        if(!order || order._id !== orderId) {
            dispatch(getOrderById(orderId))
        }
    }, [order, orderId]) 

    return (
        <>
        {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
        <div> 
          <Row>
              
          <Col md={8}>
            <div className = "CardDetails2">
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
                                        {item.type === "dc" ? <Image src={item.custImage } alt="1" fluid rounded></Image>: <div/>}
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
            </Col>
            
          <Col md={4}>
                <div className = "CardDetails2">
                    <p><strong>{t('ORDER SUMMERY.1')}:</strong></p>
                    <p><strong>{t('Total number.1')}:</strong> {order.orderItems.reduce((acc, current) => acc + current.qty, 0)}</p>
                    <p><strong>{t('Total price.1')}:</strong> {order.orderItems.reduce((acc, current) => acc + Number(current.price), 0)}</p>
                    <p><strong>{t('Payment status.1')}:</strong> {!order.isPaid ? t('Not paid.1') : t('Paid.1')}</p>
                    {order.isPaid ? <p><strong>{t('Paid at.1')}:</strong>  order.paidAt </p>: ""}
                    <p><strong>{t('Delivery status.1')}:</strong> {!order.isDelivered ? t('Not delivered.1') : t('Deliverd.1')}</p>
                    {order.isDelivered ? <p><strong>{t('Delivered at.1')}:</strong>  order.deliveredAt </p>: ""}
                    <Status/>
                </div>
            </Col>
          </Row>
        </div>}
        </>
    )
}
export default OrdersScreen
