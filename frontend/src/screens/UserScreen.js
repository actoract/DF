import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import {regAction, getProfileAction, loginAction, updProfileAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'

const UserScreen = ({location, history}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConf] = useState('')
    const [mes, setMess] = useState(null)

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, user} = userProfile

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdProfile = useSelector(state => state.userUpdProfile)
    const {success} = userUpdProfile

    useEffect (() => {
        if(!userInfo){
            history.push('/login') 
        }
        else {
            if (!user){
                dispatch(getProfileAction('profile'))
            }
            else{
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        /*if(password && password !== passwordConfirm){
            message.error(t('Passwods dont match.1'), 3);
        }*/
            dispatch(updProfileAction({id: user._id, firstName, lastName, email, password}))
        if (success){
            message.success(t('Success.1'), 1)
        }
    }
    return (
        <Row>
            <Col md = {3}>

            </Col>
            <Col md = {6}>
                <FormCont>
                <h1>user profile</h1>
                {loading && <Loader/>}
                <Form onSubmit = {submitHandler}>
                    <Form.Group controlId='firstName'>
                        <Form.Label>first name</Form.Label>
                        <Form.Control type = "firstName" placeholder = {firstName} onChange = {(e) => setFirstName(e.target.value)}>{firstName}</Form.Control>
                    </Form.Group>
                    <Form.Group controlId='lastName'>
                        <Form.Label>last name</Form.Label>
                        <Form.Control type = "lastName" placeholder = {lastName} onChange = {(e) => setLastName(e.target.value)}>{lastName}</Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>email adress</Form.Label>
                        <Form.Control type = "email" placeholder = {email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>password</Form.Label>
                        <Form.Control type = "password" placeholder = 'enter password' onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='passwordConf'>
                        <Form.Label>password</Form.Label>
                        <Form.Control type = "passwordConf" placeholder = 'confirm password' onChange = {(e) => setPasswordConf(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button className = "button_for_everything" type='submit' variant='primary'>update</Button>
                    </Form>
                </FormCont>
            </Col>
        </Row>
    )
}
export default UserScreen
