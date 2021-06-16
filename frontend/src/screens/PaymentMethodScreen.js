import React, {useState, useEffect} from 'react'
import {Form,  Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormCont from '../components/form'
import Steps from '../components/steps'
import { useTranslation } from 'react-i18next'
import {savePaymentMethod} from '../actions/cartAction'

const PaymentMethodScreen = ({history}) => {
    const userCart = useSelector(state => state.userCart)
    
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userDet} = userLogin
    useEffect (() => {
        if(!userDet){
        history.push('/login') 
        }
    }, [history, userDet])
    const {deliveryAddress} = userCart
    if(!deliveryAddress){
        history.push('/shiping')
    }
    const [paymentMethod, setPaymentMethod] = useState('Credit card');
    const { t } = useTranslation(); 
    const dispatch = useDispatch()
    const submitHandler = (e) => {
    }
    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/finishorder')
    }
    return (
        <FormCont className = "FormCont">
            <Steps step3></Steps>
           <Form onSubmit = {submitHandler} >
                <Form.Group controlId='paymentMethod'>
                    <Form.Label as='legend'>{t('payment method.1')}</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='Credit card' id='PayPal' name='paymentMethod' value='Credit card' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <div className = 'navbut2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>
           </Form>
        </FormCont>
    )
}
export default PaymentMethodScreen
