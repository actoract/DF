import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import CartDetails from "../components/cardDetails"
import { useTranslation } from 'react-i18next'
import {Col, Row, Image} from 'react-bootstrap'
import { Popover, Modal } from 'antd';
import ModalMessage from "../components/modalMessage"
import {Link} from 'react-router-dom'
import {USER_PROFILE_UPD_RESET} from '../constants/storeConst'
import {testproductsListAction} from '../actions/testproductsActions'

const ManageTestProdScreen = ({history, match}) => {
    const testproductId = match.params.id
    const dispatch = useDispatch()

    const testproductsList = useSelector(state => state.testproductsList)
    const { testproducts, loading, error  } = testproductsList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const { t } = useTranslation()
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(testproductsListAction())
        }
        else{
            history.push('/login')
        }
    }, [dispatch, history, userInfo])
    const deleteHandle = (id) => {
        if(window.confirm('Are you sure?')){
            //delete
        }
    }
    return (
        <>
           <h1>Test products</h1> 
           {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
            <>
            <Row  key = "header">
                <Col md={1} className =""><strong>{t('Image.1')}</strong></Col> 
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Name.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Digital price.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Real price.1')}</strong></Col> 
            </Row>
            {testproducts.map(item => (
                <Row key={item.id} className = "CardDetails2 details">
                    <div className = "CloseBut" onClick = {() => deleteHandle()}>
                        ✕
                    </div>
                    <Col md={1}><Image src = {item.image} alt={item.name} fluid rounded/></Col>
                    <Col md={4}>{item._id}</Col>
                    <Col md={2}>{item.name.nameRus}/{item.name.nameEng}</Col>
                </Row>
            ))}
            </>
           }
        </>
    )
}
export default ManageTestProdScreen
