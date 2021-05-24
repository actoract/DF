import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Card} from 'react-bootstrap'
import './styles.css'
import {addToCart} from '../actions/cartAction'

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id
    const { t } = useTranslation(); 

    const qty = location.search ? Number(location.search.substring(
        location.search.lastIndexOf("qty=") + 4, 
        location.search.lastIndexOf("?type"))) : 1
    const type = location.search ? location.search.substring(
        location.search.lastIndexOf("type=") + 5, 
        location.search.lastIndexOf("?size")) : ""
    const size = location.search ? location.search.split('size=').pop() : ""
    const dispatch = useDispatch()
    const userCart = useSelector(state => state.userCart)
    const {cartItems} = userCart
    useEffect (() => {
        if(productId){
            dispatch(addToCart(productId, qty, type, size))
        }
    }, [dispatch, productId, qty, type, size])
    const removeFromCart = (id) => {
        console.log(id)
    }

    const handleSizeChange = (e, item) => {
        const keys = Object.keys(item.sizeStatus); 
        for (let key of keys) {
            if (item.sizeStatus[key].size == e.target.value){
                //qty = cartItems.sizeStatus[key].countInStock
                dispatch(addToCart(item.product, item.sizeStatus[key].countInStock, item.type, e.target.value))
            }
        }
    }
   console.log(cartItems.length)
    return (
        <div className = "mainProduct">
            <ListGroup variant = 'flush'>
                            {cartItems.map(item => (
                             <ListGroup.Item key = {item.product}>
                                 <div className = "CloseBut">
                                    ✕
                                </div>
                                 <Row>
                                 <Col md={1}>
                                    <Image src = {item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md = {2}>
                                <Link to = {`/products/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                                </Col>
                                <Col md = {1}>
                                    <strong>{t('Price.1')}: </strong> {item.price}
                                </Col>
                                <Col md = {2}>
                                    <strong>{t('Type.1')}: </strong>{item.type == "rc" ? t('RC.1') :  t('DC.1')}
                                </Col>
                                <Col md = {3}>
                                    {item.type == "rc" ?
                                        <Col>
                                            <strong>{t('Size.1')}: </strong>
                                            <Form.Control as='select' value={item.size} onChange = {(e) => dispatch(addToCart(item.product, 3, item.type, Number(e.target.value)))}>
                                                {Object.values(item.sizeStatus).map(x => (
                                                <option value={x.size} className="card-panel" key = {x.size}>
                                                {x.size}
                                                </option>
                                                ))}
                                            </Form.Control>
                                        </Col> :
                                        <Col>
                                            <strong>{t('Size.1')}: </strong> {t('unified.1')}
                                        </Col>
                                    }
                                </Col>
                                    {item.type == "rc" ?
                                        <Col md = {2}>
                                            <strong>{t('Quantity.1')}: </strong>
                                            <Form.Control as='select' value={item.qty} onChange = {(e) => dispatch(addToCart(item.product, Number(e.target.value), item.type, item.size))}>  
                                                {[...Array(item.qty).keys()].map(x => (
                                                <option key = {x + 1} value = {x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col > :
                                        <Col md = {2}>
                                            <strong>{t('Quantity.1')}: </strong> {item.qty}
                                        </Col>
                                    }
                                 </Row>
                             </ListGroup.Item>
                            ))}
                        </ListGroup>
        </div>
    )
}

export default CartScreen