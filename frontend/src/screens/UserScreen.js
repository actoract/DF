import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import {userOrdersAction} from '../actions/orderActions'
import {getProfileAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'
import { LinkContainer } from 'react-router-bootstrap'
import { Popover,  } from 'antd';
import '../styles/user.css'
import Message from '../components/message'

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
    const {userDet} = userLogin

    const userUpdProfile = useSelector(state => state.userUpdProfile)
    const {success} = userUpdProfile

    const messageOnHover = (
        <div>
            <p>In order to view details click on the order</p>
        </div>
    );
    useEffect (() => {
        if(!userDet || userDet.isAdmin){
            history.push('/login') 
        }
        else {
            if (!user || !user.firstName || success) {
                //dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getProfileAction('profile'))
                dispatch(userOrdersAction())
            } else {
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userDet, user])

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
        <>{userDet &&
            <Row className="user">
                <Col md={3}>
                    <div className = "userInfo">
                        <p><strong>{t('First name.1')}:</strong> {userDet.firstName}</p>
                        <p><strong>{t('Last name.1')}:</strong> {userDet.lastName}</p>
                        <p><strong>{t('Email.1')}:</strong> {userDet.email}</p>
                    </div>
                </Col>
                <Col md = {9}>
                        
                    {loadingOrders ? <Loader loadingVal = {loadingOrders}/> : 
                    errorOrders ? <Message>{errorOrders}</Message> :
                    !orders ? 
                        <h1>t('ORDER LIST IS EMPTY.1')</h1>:
                        <>
                        {orders.map(item => (
                            <LinkContainer to={`/order/${item._id}`}>
                                <Popover content={messageOnHover} title="How to view order details?" key={item._id}> 
                                <Row key={item._id} className = "CardDetails2 details">
                                    <Col md={4}>{t('ID.1')}: {item._id}</Col>
                                    <Col md={2}>{item.user && item.user.firstName} {item.user && item.user.lastName}</Col>
                                    <Col md={2}>{t('Total price.1')}: {item.totalPrice && item.totalPrice}</Col>
                                    {
                                        item.isPaid == false ? <Col md={2}> <strong>{t('Paid.1')}: ✕</strong></Col> : <Col md={2}> <strong>{t('Paid.1')}: ✓ </strong></Col>
                                    }
                                    {
                                        item.isDelivered == false ? <Col md={2}> <strong>{t('Delivered.1')}: ✕</strong></Col> : <Col md={2}> <strong> {t('Delivered.1')}: ✓ </strong></Col>
                                    }
                                </Row>
                                </Popover>
                            </LinkContainer>
                        ))}
                        </>
                    }
                </Col>
            </Row>
        }
        </>
    )
}
export default UserScreen
