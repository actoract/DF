import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {usersAction} from '../actions/userAction'
import CartDetails from "../components/cardDetails"
import { useTranslation } from 'react-i18next'

const UsersScreen = () => {
    
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const { users, loading, error  } = allUsers

    const { t } = useTranslation()
    useEffect(() => {
        dispatch(usersAction())
    }, [dispatch])
    return (
        <>
           <h1>Users</h1> 
           {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
           <>
           {users.map(item => (
                <CartDetails className = "CardDetails2 details" key = {item._id}
                id = {item._id} 
                text={[t('Total price.1'), t('Order date.1'), item.isPaid, item.isDelivered]} 
                type="details"
                />
           ))}
           </>
           }
        </>
    )
}
export default UsersScreen
