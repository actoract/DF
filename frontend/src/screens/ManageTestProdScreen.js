import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import CartDetails from "../components/cardDetails"
import { useTranslation } from 'react-i18next'
import {Col, Row, Image} from 'react-bootstrap'
import { Popover, Modal, Popconfirm } from 'antd';
import ModalMessage from "../components/modalMessage"
import {Link} from 'react-router-dom'
import {USER_PROFILE_UPD_RESET} from '../constants/storeConst'
import {TEST_PRODUCTS_CREATE_RESET} from '../constants/storeConst'
import add from './add.png'
import {testproductsListAction, deleteTestProductAction, createTestProductAction} from '../actions/testproductsActions'

const ManageTestProdScreen = ({history, match}) => {
    const testproductId = match.params.id
    const dispatch = useDispatch()

    const testproductsList = useSelector(state => state.testproductsList)
    const { testproducts, loading, error  } = testproductsList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const testproductCreate = useSelector(state => state.testproductCreate)
    const { success: successCreate, loading: loadingCreate, error: errorCreate, testproduct: createdTestProduct  } = testproductCreate


    const testproductDelete = useSelector(state => state.testproductDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete  } = testproductDelete

    const { t } = useTranslation()
    
    useEffect(() => {
        dispatch({type: TEST_PRODUCTS_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/testproduct/${createdTestProduct._id}/edit`)
        }
        else{
            dispatch(testproductsListAction())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdTestProduct])

    const deleteHandle = (id) => {
        if(window.confirm('Are you sure?')){
            //delete
        }
    }
    const confirmDelete = (id) => {
        //alert(id);
        dispatch(deleteTestProductAction(id))
        //message.success('Click on Yes');
    } 
    const cancelDelete = (e) => {
        console.log(e);
        //message.error('Click on No');
    }
    const addHandle = (d) => {
        dispatch(createTestProductAction())
    }
    return (
        <>
           <Row>
                <h3>Test products</h3> 
                <Image src = {add} alt={add} className="add" onClick={addHandle}/>
            </Row>
           {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
            <>
            <Row  key = "header" className="text_details">
                <Col md={1} className =""><strong>{t('Image.1')}</strong></Col> 
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Name.1')}</strong></Col> 
            </Row>
            {testproducts.map(item => (
                <Row key={item.id} className = "CardDetails2 details">
                    <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirmDelete(item._id)}
                    onCancel={cancelDelete}
                    okText="Yes"
                    cancelText="No"
                    >
                        <div className = "CloseBut">
                            ✕
                        </div>
                    </Popconfirm>
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
