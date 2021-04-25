import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import StepsComp from '../components/steps'
import {regAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {deliveryAddress} = cart
    const [address, setAddress] = useState(deliveryAddress.address);
    const [city, setCity] = useState(deliveryAddress.city);
    const [postCode, setPostCode] = useState(deliveryAddress.postCode);
    const [country, setCountry] = useState(deliveryAddress.country);
    const { t } = useTranslation(); 
    const dispatch = useDispatch()
    const submitHandler = (e) => {
    }
    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch(saveAddress({address, city, postCode, country}))
        history.push('/payment')
    }
    return (
        <FormCont className = "FormCont">
           <h1>Shipping</h1> 
            <StepsComp step2></StepsComp>
           <Form onSubmit = {submitHandler} >
                <Form.Group controlId='address'>
                    <Form.Label>address</Form.Label>
                    <Form.Control required type = "text" placeholder = 'enter address' onChange = {(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>city</Form.Label>
                    <Form.Control required type = "text" placeholder = 'enter city' onChange = {(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>country</Form.Label>
                    <Form.Control required type = "text" placeholder = 'enter country' onChange = {(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>post code</Form.Label>
                    <Form.Control required type = "text" placeholder = 'enter post code' onChange = {(e) => setPostCode(e.target.value)}></Form.Control>
                </Form.Group>
                <div className = 'nav-but2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>
           </Form>
        </FormCont>
    )
}
export default ShippingScreen
