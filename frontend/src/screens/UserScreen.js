import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Form, Button, Row, Col, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
//import Message from '../components/message'
import Loader from '../components/loader'
import FormCont from '../components/form'
import {userOrdersAction} from '../actions/orderActions'
import {regAction, getProfileAction, loginAction, updProfileAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'
import CartDetails from "../components/cardDetails"
import ModalMessage from "../components/modalMessage"

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
    const {loading: loadingProfile, error: errorProfile, user} = userProfile

    const userOrders = useSelector(state => state.userOrders)
    const {loading: loadingOrders, error: errorOrders, orders} = userOrders

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdProfile = useSelector(state => state.userUpdProfile)
    const {success} = userUpdProfile

    useEffect (() => {
        if(!userInfo){
            history.push('/login') 
        }
        else {
            if (!user.firstName){
                dispatch(getProfileAction('profile'))
                dispatch(userOrdersAction())
            }
            else{
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    /*const submitHandler = (e) =>{
        e.preventDefault()
        /*if(password && password !== passwordConfirm){
            message.error(t('Passwods dont match.1'), 3);
        }
            dispatch(updProfileAction({id: user._id, firstName, lastName, email, password}))
        if (success){
            message.success(t('Success.1'), 1)
        }
    }*/
    return (
        <>
            <Row>
                <Col md={3}>
                    <div className = "CardDetails2">
                        <p><strong>{t('First name.1')}:</strong> {userInfo.firstName}</p>
                        <p><strong>{t('Last name.1')}:</strong> {userInfo.lastName}</p>
                        <p><strong>{t('Email.1')}:</strong> {userInfo.email}</p>
                    </div>
                </Col>
                <Col md = {9}>
                    <CartDetails key={t('ID.1')} id = {t('ID.1')} 
                    text={[t('Total price.1'), t('Order date.1'), t('Paid.1'), t('Delivered.1')]} 
                    type="header"
                    page="user"></CartDetails>
                        
                    {loadingOrders ? <Loader loadingVal = {loadingOrders}/> : !orders ? 
                        <CartDetails className = "CardDetails2 details" key = "empty order" 
                        text={[t('ORDER LIST IS EMPTY.1')]} 
                        type="details" 
                        page="user">
                        </CartDetails>:
                        <>
                        {orders.map(item => (
                            <CartDetails className = "CardDetails2 details" key = {item._id}
                            id = {item._id} 
                            text={[t('Total price.1'), t('Order date.1'), item.isPaid, item.isDelivered]} 
                            type="details"
                            page="user"
                            />
                        ))}
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}
export default UserScreen
