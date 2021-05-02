import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message, Popconfirm } from 'antd'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import ItemList from '../components/itemList'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import Status from '../components/status'
import {getOrderById, ordersAction} from '../actions/orderActions'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'

const OrdersScreen_Admin = ({history}) => {
    //const orderId = match.params.id
    const ordersAdmin = useSelector(state => state.ordersAdmin)
    const {loading, orders, error} = ordersAdmin

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch();
    const { t } = useTranslation(); 

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(ordersAction())
        }
    }, [dispatch, userInfo, history]) 

    const confirmUpdate = (id) => {
        //alert(id);
        //dispatch(deleteProductAction(id))
        //message.success('Click on Yes');
    } 
    const cancelUpdate = (e) => {
        console.log(e);
        //message.error('Click on No');
    }
    return (
        <>
            <Row>
                <h3>Orders</h3> 
            </Row>
            {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
            <>
            <Row  key = "header">
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('USER.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('EMAIL.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('TOTAL PRICE.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('PAYMENT STATUS.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('DELIVERY STTUS.1')}</strong></Col> 
            </Row>
            {orders.map(item => (
                <Row key={item._id} className = "CardDetails2 details">
                    <Popconfirm
                    title="Are you sure you wnt to update order on DELIVERED"
                    onConfirm={() => confirmUpdate(item._id)}
                    onCancel={cancelUpdate}
                    okText="Yes"
                    cancelText="No"
                    >
                        <div className = "CloseBut" >
                            ✕
                        </div>
                    </Popconfirm>
                    <Col md={4}>{item._id}</Col>
                    <Col md={2}>{item.user && item.user.firstName} {item.user && item.user.lastName}</Col>
                    <Col md={2}>{item.user && item.user.email}</Col>
                    <Col md={2}>{item.isPaid}</Col>
                    <Col md={2}>{item.isPaid}</Col>
                    <Col md={2}>{item.isDelivered}</Col>
                </Row>
            ))}
            </>
           }
        </>
    )
}
export default OrdersScreen_Admin
