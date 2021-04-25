import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, Form, Container} from 'react-bootstrap'
import {addToCart, removeFromCart, changeCart} from '../actions/cartAction'
import Uploader from '../components/upload'
import smile from './smile.png';
import { message } from 'antd';

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
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    useEffect (() => {
        if(productId){
            dispatch(addToCart(cartItems.length + 1, productId, qty, type, Number(size), 0))
        }
    }, [dispatch, productId, qty, type, size])
    
    const handleRemove = (id, size) => {
        dispatch(removeFromCart(id, Number(size)))
    }

    const handleSizeChange = (e, item) => {
        const keys = Object.keys(item.sizeStatus); 
        for (let key of keys) {
            if (item.sizeStatus[key].size == e.target.value){
                //qty = cartItems.sizeStatus[key].countInStock
                dispatch(changeCart(item.product, 
                    item.sizeStatus[key].countInStock, 
                    item.type, Number(e.target.value), 
                    item.sizeStatus[key].countInStock,
                    ""))
            }
        }
    }
    const handleChange = (e, item) => {
        const keys = Object.keys(item.sizeStatus); 
        const  exist = cartItems.find(x => x.product == item.product && Number(e.target.value) == Number(x.size));
        console.log(exist)
        if (exist){
            message.success("Exist", 3);
        }
        else{
            for (let key of keys) {
                if (item.sizeStatus[key].size == Number(e.target.value)){
                    //qty = cartItems.sizeStatus[key].countInStock
                    dispatch(changeCart(
                        item.id,
                        item.product, 
                        item.sizeStatus[key].countInStock, 
                        item.type, Number(e.target.value), 
                        item.sizeStatus[key].countInStock,
                        ""))
                }
            }
        }
    }
   const handleCheckout = () => {
        history.push('/login?redirect=shipping')
   }
   const uploadImage = (e, item) => {
        e.preventDefault();
        const { files } = e.target;
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", ()=>{
        const file = myFileItemReader.result
        if(file){
            dispatch(changeCart(
                item.id,
                item.product, 
                item.isizeStatus, 
                item.type, 
                item.size, 
                item.countInStock,
                window.URL.createObjectURL(files[0]))
            )}
        }, false)
        myFileItemReader.readAsDataURL(files[0])
    }
    return (
        <div className = "mainProduct">
            {cartItems.length === 0 ?  (
                <Container>
                <Row className="justify-content-md-center">
                    <img src={smile}  className = "EmptyStore"/>
                </Row>
                <Row className="justify-content-md-center">
                    <h5>
                    {t('Your cart is empty.1')}
                    <span>
                    </span>
                    </h5>
                </Row>
                <Row className="justify-content-md-center">
                    <h5><Link to='/store' className = "linkStore"> {t('Go back to store.1')} </Link></h5>
                </Row>
                </Container>) :
            (<Row>
                <Col md={8}>
                {cartItems.map(item => (
                    <div className = "CardDetails2" key = {item.product + "/" + item.size}>
                        <div className = "CloseBut" onClick = {() => handleRemove(item.id, item.size)}>
                            ✕
                        </div>
                        <Row>
                            <Col md={2}>
                                <Image src = {item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col md = {2}>
                                <Link to = {`/products/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                            </Col>
                            <Col md = {2}>
                                <strong>{t('Price.1')}: </strong> {item.price}
                            </Col>
                            <Col md = {2}>
                                <strong>{t('Type.1')}: </strong>{item.type == "rc" ? t('RC.1') :  t('DC.1')}
                            </Col>
                            {item.type == "rc" ?
                                <Col md = {2}>
                                    <strong>{t('Quantity.1')}: </strong>
                                    <Form.Control as='select' custom value={item.qty} onChange = {(e) => dispatch(changeCart(item.id, item.product, Number(e.target.value), item.type, item.size, item.countInStock))}>  
                                        {[...Array(item.countInStock).keys()].map(x => (
                                        <option key = {x + 1} value = {x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                    </Form.Control>
                                </Col > :
                                <Col md = {2}>
                                    <p><strong>{t('Upload image.1')}: </strong> </p>
                                    <Uploader item = {item}/>
                                    <input
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        className = 'button_for_everything'
                                        type="file" 
                                        accept=".png, .jpg, .jpeg"
                                        name="photo"
                                        onChange={e => uploadImage(e, item)}
                                    />
                                    <label>
                                    <input type="file" name="file" accept=".png, .jpg, .jpeg" className = 'button_for_everything'/>
                                    <span>Выберите файл</span>
                                    </label>
                                </Col>
                            }
                             <Col md = {2}>
                                {item.type == "rc" ?
                                    <Col>
                                        <strong>{t('Size.1')}: </strong>
                                        <Form.Control as='select' custom value={item.size} onChange = {e => handleChange(e, item)}> 
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
                        </Row>
                    </div>
                ))}
                </Col>
                    <Col md={3}>
                        <div className = "CardDetails2">
                            <p><strong>{t('Total number.1')}:</strong> {cartItems.reduce((acc, current) => acc + current.qty, 0)}</p>
                            <p><strong>{t('Total price.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.price), 0)}</p>
                            <div className = 'nav-but2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>  
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default CartScreen