import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import Steps from '../components/steps'
import {regAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'
import {savePaymentMethod} from '../actions/cartAction'

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {deliveryAddress} = cart
    if(!deliveryAddress){
        history.push('/shiping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const { t } = useTranslation(); 
    const dispatch = useDispatch()
    const submitHandler = (e) => {
    }
    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormCont className = "FormCont">
           <h1>Shipping</h1> 
            <Steps step3></Steps>
           <Form onSubmit = {submitHandler} >
                <Form.Group controlId='paymentMethod'>
                    <Form.Label as='legend'>payment method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <div className = 'nav-but2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>
           </Form>
        </FormCont>
    )
}
export default PaymentScreen
