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
    const {loading, error, userInfo} = userReg
    useEffect (() => {
        if(userInfo){
        history.push(redirect) 
        }
    }, [history, userInfo, redirect])
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
            <h1>sign up</h1>
            {loading && <Loader/>}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>first name</Form.Label>
                    <Form.Control type = "firstName" placeholder = 'enter first name' onChange = {(e) => setFirstName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='lastName'>
                    <Form.Label>last name</Form.Label>
                    <Form.Control type = "lastName" placeholder = 'enter last name' onChange = {(e) => setLastName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>email adress</Form.Label>
                    <Form.Control type = "email" placeholder = 'enter email' onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type = "password" placeholder = 'enter password' onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConf'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type = "passwordConf" placeholder = 'confirm password' onChange = {(e) => setPasswordConf(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className = "button_for_everything" type='submit' variant='primary'>sign up</Button>
            </Form>
            <Row className = 'py-3'>
                <Col>
                have an account ? <Link to = {redirect ? `/login?redirect=${redirect}` : '/register'}>login</Link>
                </Col>
            </Row>
        </FormCont>
    )
}
export default RegScreen
