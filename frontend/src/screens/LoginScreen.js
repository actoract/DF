import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import {loginAction} from '../actions/userAction.js'
import { message } from 'antd';

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin
    useEffect (() => {
        if(userInfo){
        history.push(redirect) 
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(loginAction(email, password))
    }
    return (
        <FormCont>
            <h1>Sign In</h1>
            {error && message.error(error, 3)}
            {loading && <Loader/>}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type = "email" placeholder = 'Enter email' onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type = "password" placeholder = 'Enter password' onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className = "button_for_everything" type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className = 'py-3'>
                <Col>
                New customer ? <Link to = {redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormCont>
    )
}
export default LoginScreen
