import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import {userOrdersAction} from '../actions/orderActions'
import {getProfileAction} from '../actions/userAction.js'
import { useTranslation } from 'react-i18next'
import { LinkContainer } from 'react-router-bootstrap'
import { Popover, Col, Row } from 'antd';
import Message from '../components/message'

const UserScreen = ({location, history}) => {

    const style1 = {  
        position: 'relative',
        width: 'auto',
        height: 'auto',
        top: '0',
        maxHeight: '1000px',
        padding: '20px',
        marginBottom: '10px',
        borderRadius: '5px',
        borderWidth: '10px',
        backdropFilter: '1px',
        backgroundColor: 'white',
        boxShadow: '0 6px 15px rgb(36 37 38 / 8%)',
    };
    const style2={  
        textAlign: 'left',
        fontSize: '16px',
        marginTop: '20px',
        margin: '20px',
        padding: '20px',
    }
    const style3 = {  
        position: 'relative',
        width: 'auto',
        height: 'auto',
        top: '0',
        maxHeight: '1000px',
        padding: '20px',
        marginBottom: '10px',
        borderRadius: '5px',
        borderWidth: '10px',
        backdropFilter: '1px',
        backgroundColor: 'white',
        boxShadow: '0 6px 15px rgb(36 37 38 / 8%)',
        marginTop: '30px',
      };

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
            } 
        }
    }, [dispatch, history, userDet, user])

    return (
        <>{userDet &&
            <>
                <Row>
                    <Col span={4}>
                        <div style = {style1}>
                            <p><strong>{t('First name.1')}:</strong> {userDet.firstName}</p>
                            <p><strong>{t('Last name.1')}:</strong> {userDet.lastName}</p>
                            <p><strong>{t('Email.1')}:</strong> {userDet.email}</p>
                        </div>
                    </Col>
                    <Col span={18}key = "header" style={style2}>
                        <Row>
                            <Col span={9}>{t('ID.1')}</Col>
                            <Col span={4}>{t('Total price.1')}</Col>
                            <Col span={4}>{t('Paid.1')}</Col>
                            <Col span={4}>{t('Delivered.1')}</Col>

                            <Col span = {24}>                        
                            {loadingOrders ? <Loader loadingVal = {loadingOrders}/> : 
                            errorOrders ? <Message>{errorOrders}</Message> :
                            !orders ? 
                                <h1>t('ORDER LIST IS EMPTY.1')</h1>:
                                <>
                                {orders.map(item => (
                                    <LinkContainer to={`/order/${item._id}`}>
                                        <Popover content={messageOnHover} title="How to view order details?" key={item._id}> 
                                        <Row key={item._id} style={style3}>
                                            <Col span={9}>{item._id}</Col>
                                            <Col span={4}>{item.totalPrice && item.totalPrice}</Col>
                                            {
                                                item.isPaid == false ? <Col span={4}> <strong>✕</strong></Col> : <Col span={4}> <strong> ✓ </strong></Col>
                                            }
                                            {
                                                item.isDelivered == false ? <Col span={4}> <strong>✕</strong></Col> : <Col span={4}> <strong> ✓ </strong></Col>
                                            }
                                        </Row>
                                        </Popover>
                                    </LinkContainer>
                                ))}
                                </>
                            }
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        }
        </>
    )
}
export default UserScreen
