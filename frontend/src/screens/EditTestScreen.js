import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Form} from 'react-bootstrap'
import {testproductsListAction, updateTestProductAction} from '../actions/testproductsActions'
import { message } from 'antd';
import { TEST_PRODUCTS_UPDATE_RESET } from '../constants/storeConst';

const EditTestScreen = ({history, match}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const testproductId = match.params.id
    const [nameRus, setNameRus] =  useState('')
    const [nameEng, setNameEng] =  useState('')
    const [image, setImage] =  useState('')
    const [model, setModel] =  useState('')
    const [descCare, setdescCare] =  useState('')
    const [descMaterial, setMaterial] =  useState('')
    const [descColor, setColor] =  useState('')

    const testproductUpdate = useSelector(state => state.testproductUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = testproductUpdate

    const testproductDet = useSelector((state) => state.testproductDet)
    const {loading, error, testproduct} = testproductDet

    const userLogin = useSelector(state => state.userLogin)
    const {userDet} = userLogin

    useEffect (() => {
        if(!userDet || !userDet.isAdmin){
            history.push('/login') 
        }
        else if(successUpdate){
            dispatch({type: TEST_PRODUCTS_UPDATE_RESET})
            history.push('/test')
        }
        else{
            if(!testproductUpdate.name || testproductUpdate._id !== testproductId){
                dispatch(testproductsListAction(testproductId))
            }
            else{

            }
        }
    },[dispatch, history, testproductId, testproduct, successUpdate])

    const handleCheckout = (e) => {
        e.preventDefault();
        if(nameRus && nameEng && image && model && descCare && descMaterial && descColor){
            dispatch(updateTestProductAction({
                _id: testproductId,
                name: {nameRus:nameRus, nameEng: nameEng},
                image,
                model,
                description:{
                    care: descCare, 
                    material: descMaterial, 
                    color: descColor},
            }))
        }
        else{
            message.error(t('Fill the form.1'), 3)
        }
    }
    return ( 
        <Row className = 'justify-content-md-center'>
            <Col>
            <h3>{t("Add test product data.1")}</h3>
                <Form.Group controlId='nameRus'>
                    <Form.Label>{t("name(rus).1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!nameRus ? t("enter.1")  : nameRus} onChange = {(e) => setNameRus(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='nameEng'>
                    <Form.Label>{t("name(eng).1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!nameEng ? t("enter.2") : nameEng} onChange = {(e) => setNameEng(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>{t("image.1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!image ? t("enter.3") : image} onChange = {(e) => setImage(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='model'>
                    <Form.Label>{t("model.1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!model ? t("enter.4") : model} onChange = {(e) => setModel(e.target.value)}></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='descCare'>
                    <Form.Label>{t("description:care.1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!descCare ? t("enter.6") : descCare} onChange = {(e) => setdescCare(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='descCare'>
                    <Form.Label>{t("description:material.1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!descMaterial ? t("enter.7") : descMaterial} onChange = {(e) => setMaterial(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='descColor'>
                    <Form.Label>{t("description:color.1")}</Form.Label>
                    <Form.Control required type = "text" placeholder = {!descColor ? t("enter.8") : descColor} onChange = {(e) => setColor(e.target.value)}></Form.Control>
                </Form.Group>
                <div className = 'nav-but2' onClick = {handleCheckout}>{t('Add product.1')}</div>
            </Col>
        </Row>

    )
}

export default EditTestScreen