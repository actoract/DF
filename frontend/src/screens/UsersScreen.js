import React, {useState, useEffect, Suspnse} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import { useTranslation } from 'react-i18next'
//import {Col, Row} from 'react-bootstrap'
import { Popover, message,  Row, Col  } from 'antd';
import './styles.css'
import ModalMessage from "../components/modalMessage"
import {USER_PROFILE_UPD_RESET} from '../constants/storeConst'
import {getProfileAction, 
        usersAction,
        updProfileAction} from '../actions/userAction'

const Message = React.lazy(() => import('../components/message'));



const UsersScreen = ({history, match}) => {
    const style1 = {
        textAlign: 'left',
        fontSize: '16px',
        margin: '30px',
    };
    
    const style2 = {  
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
      marginTop: '20px',
      margin: '20px'
    };
    const userId = match.params.id
    const [isAdmin, setAdmin] = useState(false);
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const { users, loading, error  } = allUsers

    const userLogin = useSelector(state => state.userLogin)
    const {userDet} = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const {user} = userProfile

    const userUpdProfile = useSelector(state => state.userUpdProfile)
    const {success: UpdSucccess} = userUpdProfile
   
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
           <Row  style={style1} key = "header">
                <Col span={4}><strong>{t('ID.1')}</strong></Col> 
                <Col span={2}><strong>{t('First name.1')}</strong></Col> 
                <Col span={2}><strong>{t('Last name.1')}</strong></Col> 
                <Col span={2}><strong>{t('Email.1')}</strong></Col> 
                <Col span={2}><strong>{t('Admin status.1')}</strong></Col> 
            </Row>
           {users.map(item => (
               <Popover content={messageAdminOnHover} title="How to update user status?" key={item._id}> 
                <Row key={users.id}  style={style2} onClick = {e => handleStatusChange(e, item._id)}>
                    <Col span={4}>{item._id}</Col>
                    <Col span={2}>{item.firstName}</Col>
                    <Col span={2}>{item.lastName}</Col>
                    <Col span={2}>{item.email}</Col>
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
