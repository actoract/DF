import React, {useState, useEffect} from 'react'
import { message } from 'antd'
import {Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import FormCont from '../components/form'
import StepsComp from '../components/steps'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'

const ShippingScreen = ({history}) => {
    const userCart = useSelector(state => state.userCart)
    const {deliveryAddress} = userCart
    const [address, setAddress] = useState(deliveryAddress.address);
    const [city, setCity] = useState(deliveryAddress.city);
    const [postCode, setPostCode] = useState(deliveryAddress.postCode);
    const [country, setCountry] = useState(deliveryAddress.country);
    const [email, setEmail] = useState(deliveryAddress.country);
    const { t } = useTranslation(); 
    const dispatch = useDispatch()
    const submitHandler = (e) => {
    }

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userDet} = userLogin
    useEffect (() => {
        if(!userDet){
        history.push('/login') 
        }
    }, [history, userDet])

    const handleCheckout = (e) => {
        e.preventDefault();
        if(address && city && postCode && country){
            dispatch(saveAddress({address, city, postCode, country}))
            history.push('/payment')
        }
        else{
            message.error(t('Fill the form.1'), 3)
        }
    }
    return (
        <FormCont className = "FormCont">
            <StepsComp step2></StepsComp>
           <Form onSubmit = {submitHandler} >
                <Form.Group controlId='address'>
                    <Form.Label>{t('address.1')}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!address ? t('address.2') : address} onChange = {(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>{t('city.1')}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!city ?  t('city.2'): city} onChange = {(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>{t('country.1')}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!country ? t('country.2'): country} onChange = {(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='post code'>
                    <Form.Label>{t('post code.1')}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!postCode ?  t('post code.2'): postCode} onChange = {(e) => setPostCode(e.target.value)}></Form.Control>
                </Form.Group>
                <div className = 'navbut2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>
           </Form>
        </FormCont>
    )
}
export default ShippingScreen
