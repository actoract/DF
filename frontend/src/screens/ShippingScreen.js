import React, {useState, useEffect, Suspense} from 'react'
import { message } from 'antd'
import {Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'
import Loader from '../components/loader'
const FormCont = React.lazy(() => import('../components/form'));
const StepsComp = React.lazy(() => import('../components/steps'));

const ShippingScreen = ({history}) => {
    const userCart = useSelector(state => state.userCart)
    const {deliveryAddress, cartItems} = userCart
    var dcItem = cartItems.find(item => item.type == "dc");
    var rcItem = cartItems.find(item => item.type == "rc");
    const [address, setAddress] = useState(deliveryAddress.address);
    const [city, setCity] = useState(deliveryAddress.city);
    const [email, setEmail] = useState(deliveryAddress.email);
    const [postCode, setPostCode] = useState(deliveryAddress.postCode);
    const [country, setCountry] = useState(deliveryAddress.country);
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
            dispatch(saveAddress({address, city, postCode, country, email}))
            history.push('/payment')
        }
        else{
            message.error(t('Fill the form.1'), 3)
        }
    }
    return (
        <div>
        {!dcItem && rcItem &&
        <Suspense fallback={<Loader/>}>
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
        </Suspense>
        }
        {dcItem && !rcItem &&
        <Suspense fallback={<Loader/>}>
        <FormCont className = "FormCont">
            <StepsComp step2></StepsComp>
           <Form onSubmit = {submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>{t('email.1')}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!email ? t('email.2') : email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <div className = 'navbut2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>
           </Form>
        </FormCont>
        </Suspense>
        }
        {dcItem && rcItem &&
        <Suspense fallback={<Loader/>}>
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
                <Form.Group controlId='email'>
                    <Form.Label>{t('email.1')}</Form.Label>
                    <Form.Control required type = "email"  placeholder = {!email ?  t('email.2'): email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <div className = 'navbut2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>
           </Form>
        </FormCont>
        </Suspense>
        }
        </div>
    )
}
export default ShippingScreen
