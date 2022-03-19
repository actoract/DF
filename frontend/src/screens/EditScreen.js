import React, { useEffect, useState, Suspense} from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Form} from 'react-bootstrap'
import { PRODUCTS_UPDATE_RESET } from '../constants/storeConst';
import { message} from 'antd';
import '../styles/edit.css'
import {updateProductAction, productsListAction} from '../actions/productsActions'
import Loader from '../components/loader'
const Message = React.lazy(() => import('../components/message'));

const EditScreen = ({history, match}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const productId = match.params.id
    const [nameR, setNameRus] =  useState('')
    const [nameE, setNameEng] =  useState('')

    const [image, setImage] =  useState('')
    const [model, setModel] =  useState('')

    const [priceD, setPriceDigital] =  useState('')
    const [priceR, setPriceReal] =  useState('')

    const [descCare, setdescCare] =  useState('')
    const [descMaterial, setMaterial] =  useState('')
    const [descColor, setColor] =  useState('')

    const [sizeXS, setXS] =  useState('')
    const [sizeS, setS] =  useState('')
    const [sizeM, setM] =  useState('')
    const [sizeL, setL] =  useState('')
   
    const productDet = useSelector((state) => state.productDet)
    const {loading, error, product} = productDet

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

   
    const userLogin = useSelector(state => state.userLogin)
    const {userDet} = userLogin

    useEffect (() => {
        if(!userDet || !userDet.isAdmin){
            history.push('/login') 
        }
        else if(successUpdate){
            dispatch({type: PRODUCTS_UPDATE_RESET})
            history.push('/store')
        }
        else{
            if(!productUpdate.name || productUpdate._id !== productId){
                dispatch(productsListAction(productId))
            }
            else{
                setImage(product.image)
            }
        }
    },[dispatch, history, productId, product, successUpdate, userDet])

    const handleCheckout = (e) => {
        e.preventDefault();
        if(nameR && nameE && image && model && priceD && priceR && descCare && descMaterial && descColor){
            dispatch(updateProductAction({
                _id: productId,
                name: {nameRus:nameR, nameEng: nameE},
                image,
                model,
                price: {
                    priceReal: priceD, 
                    priceDigital: priceR},
                description:{
                    care: descCare, 
                    material: descMaterial, 
                    color: descColor},
                sizeStatus: {
                    XS: sizeXS,
                    S: sizeS,
                    M: sizeM,
                    L: sizeL
                },
            }))
        }
        else{
            message.error(t('Fill the form.1'), 3)
        }
    }
    return ( 
        <Suspense fallback={<Loader/>}>
        <Row className = 'justify-content-md-center'>
            <Col>
             <h3>{t("Add product data.1")}</h3>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message>{errorUpdate}</Message>}
            <Form.Group controlId='nameRus'>
                <Form.Label>{t("name(rus).1")}</Form.Label>
                <Form.Control required type = "text" name="nameRus" placeholder = {t("enter.1")} onChange = {(e) => setNameRus(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='nameEng'>
                <Form.Label>{t("name(eng).1")}</Form.Label>
                <Form.Control required type = "text" name="nameEng" placeholder = {t("enter.2")} onChange = {(e) => setNameEng(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>{t("image.1")}</Form.Label>
                <Form.Control required type = "text" placeholder = {t("enter.3")} onChange = {(e) => setImage(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='model'>
                <Form.Label>{t("model.1")}</Form.Label>
                <Form.Control required type = "text" placeholder = {t("enter.4")} onChange = {(e) => setModel(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceDigital'>
                <Form.Label>{t("price for digital clothes.1")}</Form.Label>
                <Form.Control required type = "number" name="digital" placeholder = {t("enter.5")} onChange = {(e) => setPriceDigital(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceReal'>
                <Form.Label>{t("price for real clothes.1")}</Form.Label>
                <Form.Control required type = "number" name="real" placeholder = {t("enter.5")} onChange = {(e) => setPriceReal(e.target.value)}></Form.Control>
            </Form.Group> 
            <Form.Group controlId='descCare'>
                <Form.Label>{t("description:care.1")}</Form.Label>
                <Form.Control required type = "text" name="care" placeholder = {t("enter.6")} onChange = {(e) => setdescCare(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='descCare'>
                <Form.Label>{t("description:material.1")}</Form.Label>
                <Form.Control required type = "text" name="material" placeholder = {t("enter.7")} onChange = {(e) => setMaterial(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='descColor'>
                <Form.Label>{t("description:color.1")}</Form.Label>
                <Form.Control required type = "text" name="color" placeholder = {t("enter.8")} onChange = {(e) => setColor(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='statusSize'>
                <Form.Label>{t("count in stock.1")}</Form.Label>
                <Row>
                    <Col md={2}>
                        {t('Size.1')} XS
                    </Col>
                    <Col md={4}>
                        <Form.Control required type = "number" name="countInStock" placeholder = {t("enter.9")} onChange = {(e) => setXS(e.target.value)}></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        {t('Size.1')} S
                    </Col>
                    <Col md={4}>
                        <Form.Control required type = "number" name="countInStock" placeholder = {t("enter.9")} onChange = {(e) => setS(e.target.value)}></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        {t('Size.1')} M
                    </Col>
                    <Col md={4}>
                        <Form.Control required type = "number" name="countInStock" placeholder = {t("enter.9")} onChange = {(e) => setM(e.target.value)}></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        {t('Size.1')} L
                    </Col>
                    <Col md={4}>
                        <Form.Control required type = "number" name="countInStock" placeholder = {t("enter.9")} onChange = {(e) => setL(e.target.value)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <div className = 'navbut2' onClick = {handleCheckout}>{t('Add product.1')}</div>
        </Col>
        </Row>
        </Suspense>

    )
}

export default EditScreen