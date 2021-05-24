import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import {regAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'

const RegScreen = ({location, history}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConf] = useState('')
    const [mes, setMess] = useState(null)
    const { t } = useTranslation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userReg = useSelector(state => state.userReg)
    const {loading, error, userDet: userInfoReg} = userReg

    const userLogin = useSelector(state => state.userLogin)
    const {userDet: userInfoLogin} = userLogin
    useEffect (() => {
        if(userInfoReg || userInfoLogin){
        history.push('/') 
        }
    }, [history, userInfoReg, userInfoLogin, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password == '' || email == '' || firstName == '' || lastName == ''){
            message.error(t('Fill the form.1'), 3);
        }
        else if(password !== passwordConfirm){
            message.error(t('Passwods dont match.1'), 3);
        }
        else{
            dispatch(regAction(firstName, lastName, email, password))
        }
    }
    return (
        <FormCont>
            <h1>{t('registration.1')}</h1>
            {loading && <Loader/>}
            {error && message.error(error, 3)}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>{t('first name.1')}</Form.Label>
                    <Form.Control type = "firstName" placeholder = {t('enter first name.1')} onChange = {(e) => setFirstName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='lastName'>
                    <Form.Label>{t('last name.1')}</Form.Label>
                    <Form.Control type = "lastName" placeholder = {t('enter last name.1')} onChange = {(e) => setLastName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>email</Form.Label>
                    <Form.Control type = "email" placeholder = {t('enter email.1')} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>{t('password.1')}</Form.Label>
                    <Form.Control type = "password" placeholder = {t('enter password.1')} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConf'>
                    <Form.Label>{t('confirmation password.1')}</Form.Label>
                    <Form.Control type = "password" placeholder = {t('enter confirmation password.1')} onChange = {(e) => setPasswordConf(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className = "button_for_everything" type='submit' variant='primary'>{t('registrate.1')}</Button>
            </Form>
            <Row className = 'py-3'>
                <Col>
                {t('already have account.1')}? <Link to = {redirect ? `/login?redirect=${redirect}` : '/register'}>{t('SignIn.1')}</Link>
                </Col>
            </Row>
        </FormCont>
    )
}
export default RegScreen
