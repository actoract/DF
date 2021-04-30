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
import {productsListAction, deleteProductAction} from '../actions/productsActions'
import add from './add.png'
import { Popconfirm, message } from 'antd';

const ManageProdScreen = ({history, match}) => {
    const productId = match.params.id
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.productsList)
    const { products, loading, error  } = productsList

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete  } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const { t } = useTranslation()
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(productsListAction())
        }
        else{
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const addHandle = (d) => {
        //add
    }
    const confirmDelete = (id) => {
        //alert(id);
        dispatch(deleteProductAction(id))
        //message.success('Click on Yes');
    } 
    const cancelDelete = (e) => {
        console.log(e);
        //message.error('Click on No');
    }
    return (
        <>
            <Row>
                <h3>Products</h3> 
                <Image src = {add} alt={add} className="add" onClick={addHandle}/>
            </Row>
            {loadingDelete && <Loader loadingVal = {loading}/>}
            {errorDelete && <Message>{errorDelete}</Message>}
            {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
            <>
            <Row  key = "header">
                <Col md={1} className =""><strong>{t('Image.1')}</strong></Col> 
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Name.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Digital price.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Real price.1')}</strong></Col> 
            </Row>
            {products.map(item => (
                <Row key={item._id} className = "CardDetails2 details">
                    <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirmDelete(item._id)}
                    onCancel={cancelDelete}
                    okText="Yes"
                    cancelText="No"
                    >
                        <div className = "CloseBut" >
                            ✕
                        </div>
                    </Popconfirm>
                    <Col md={1}><Image src = {item.image} alt={item.name} fluid rounded/></Col>
                    <Col md={4}>{item._id}</Col>
                    <Col md={2}>{item.name.nameRus}/{item.name.nameEng}</Col>
                    <Col md={2}>{item.price.priceDigital}</Col>
                    <Col md={2}>{item.price.priceReal}</Col>
                </Row>
            ))}
            </>
           }
        </>
    )
}
export default ManageProdScreen
