import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import CartDetails from "../components/cardDetails"
import { useTranslation } from 'react-i18next'
import {Col, Row} from 'react-bootstrap'
import { Popover, Modal, message } from 'antd';
import './styles.css'
import ModalMessage from "../components/modalMessage"
import {Link} from 'react-router-dom'
import {USER_PROFILE_UPD_RESET} from '../constants/storeConst'
import {getProfileAction, 
        usersAction,
        updProfileAction} from '../actions/userAction'

const UsersScreen = ({history, match}) => {
    const userId = match.params.id
    const [isAdmin, setAdmin] = useState(false);
    const [idChange, setIdChange] = useState("");
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const { users, loading, error  } = allUsers

    const userLogin = useSelector(state => state.userLogin)
    const {userDet} = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const {user, loading: loadingProfile, error: errorProfile} = userProfile

    const userUpdProfile = useSelector(state => state.userUpdProfile)
    const {success: UpdSucccess, loading: loadingUpdProfile, error: errorUpdProfile} = userUpdProfile
   
    const [isModalVis, setIsModalVisible] = useState(false);
    const messageAdminOnHover = (
        <div>
            <p>In order to update user status click on profile</p>
        </div>
    );

    const { t } = useTranslation()
    useEffect(() => {
        if(UpdSucccess){
            setAdmin(user.isAdmin)
            dispatch({type: USER_PROFILE_UPD_RESET})
            //history.push()
        }
        else{
            if(user.name && user._id !== userId){
                dispatch(getProfileAction())
            }
            else{
                setAdmin(!user.isAdmin)
            }
        }
        if(user.name && user._id !== userId){
            dispatch(getProfileAction())
        }
        if(userDet && userDet.isAdmin){
            dispatch(usersAction())
        }
        else{
            history.push('/login')
        }
    }, [dispatch, history, userId, user, UpdSucccess])

    const handleStatusChange = (e, id) => {
        e.preventDefault()
        if(userDet._id != id){
            setAdmin(e.target.value)
            setIdChange(id)
            dispatch(updProfileAction({_id: id, isAdmin}))
        }
        else{
            message.error("You are not able to change your status", 3)
        }
    }
    return (
        <>
           <h1>{t("Users.1")}</h1> 
           {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
           <>
           <Row  className = "text_details" key = "header">
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('First name.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Last name.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Email.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Admin status.1')}</strong></Col> 
            </Row>
           {users.map(item => (
               <Popover content={messageAdminOnHover} title="How to update user status?" key={item._id}> 
                <Row key={users.id} className = "CardDetails2 details" onClick = {e => handleStatusChange(e, item._id)}>
                    <Col md={4}>{item._id}</Col>
                    <Col md={2}>{item.firstName}</Col>
                    <Col md={2}>{item.lastName}</Col>
                    <Col md={2}>{item.email}</Col>
                    {
                        item.isAdmin == false ? <Col md={2}> <strong>✕</strong></Col> : <Col md={2}> <strong> ✓ </strong></Col>
                    }
                </Row> 
                </Popover>
           ))}
           </>
           }
        {isModalVis ? <ModalMessage isModalVis = {isModalVis} key = {users._id}/> : <div/>}
        </>
    )
}
export default UsersScreen
