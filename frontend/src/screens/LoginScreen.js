import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import FormCont from '../components/form'
import {loginAction} from '../actions/userAction.js'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import '../styles/login.css'

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userDet} = userLogin
    useEffect (() => {
        if(userDet){
        history.push(redirect) 
        }
    }, [history, userDet, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(loginAction(email, password))
    }
    return (
        <>
        <FormCont className="login">
            <h1>{t('SignIn.1')}</h1>
            {loading && <Loader/>}
            {error && message.error(error, 3)}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>email</Form.Label>
                    <Form.Control type = "email" placeholder = {t('enter email.1')} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>{t('password.1')}</Form.Label>
                    <Form.Control type = "password" placeholder = {t('enter password.1')} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className = "button_for_everything" type='submit' variant='primary'>{t('SignIn.1')}</Button>
            </Form>
                {t('New in store.1')} ? <Link to = {redirect ? `/register?redirect=${redirect}` : '/register'}>{t('register.1')}</Link>
        </FormCont>
        </>
    )
}
export default LoginScreen
