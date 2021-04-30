import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {usersAction} from '../actions/userAction'
import CartDetails from "../components/cardDetails"
import { useTranslation } from 'react-i18next'

const UsersScreen = ({history}) => {
    
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const { users, loading, error  } = allUsers

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const { t } = useTranslation()
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(usersAction())
        }
        else{
            history.push('/login')
        }
    }, [dispatch, history])
    return (
        <>
           <h1>Users</h1> 
           {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
           <>
            <CartDetails className = "CardDetails2 details" key = "header"
                id = {t('ID.1')}
                text={[t('First name.1'), t('Last name.1'),t('Email.1'), t('Admin status.1'),]} 
                type="header"
                page="users"
            />
           {users.map(item => (
                <CartDetails className = "CardDetails2 details" key = {item._id}
                id = {item._id} 
                text={[item.firstName, item.lastName, item.email, item.isAdmin]} 
                type="details"
                page="users"
                />
           ))}
           </>
           }
        </>
    )
}
export default UsersScreen
