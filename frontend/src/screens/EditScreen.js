import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, Container, Form} from 'react-bootstrap'
import {addToCart, removeFromCart, changeCart} from '../actions/cartAction'
import {updateProductAction, productsListAction} from '../actions/productsActions'
import Uploader from '../components/upload'
import smile from './smile.png';
import { message, Input, Button, Checkbox  } from 'antd';
import FormCont from '../components/form'
import { PRODUCTS_UPDATE_RESET } from '../constants/storeConst';
import { Loader } from 'three';
import Message from '../components/message';

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
    
    const [statusSize, setSize] =  useState('')
    const [statusCountInStock, setCountInStock] =  useState('')
   
    const productDet = useSelector((state) => state.productDet)
    const {loading, error, product} = productDet

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    //const [status, setStatus] = useState(['', '']);
    const [statusArray, setStatusArray] = useState([]);
    const [status, setStatus] = useState({
        size: '',
        countInStock: '',
    });

    const [priceDR, setPrice] = useState({
        priceReal: '',
        priceDigital: '',
    });

    const [desc, setDesc] = useState({
        care: '',
        color: '',
        material: '',
    });

    const [name, setName] = useState({
        nameRus: '',
        nameEng: '',
    });

    useEffect (() => {
        if(successUpdate){
            dispatch({type: PRODUCTS_UPDATE_RESET})
            history.push('/store')
        }
        else{
            if(!productUpdate.name || productUpdate._id !== productId){
                dispatch(productsListAction(productId))
            }
            else{

            }
        }
    },[dispatch, history, productId, product, successUpdate])

    const handleCheckout = (e) => {
        e.preventDefault();
        if(nameR && nameE && image && model && priceD && priceR && descCare && descMaterial && descColor && statusSize && statusCountInStock && status){
            dispatch(updateProductAction({
                _id: productId,
                name: {nameRus:nameR, nameEng: nameE},
                image,
                model,
                price: {priceReal: priceD, priceDigital: priceR},
                description:{care: descCare, material: descMaterial, color: descColor},
                //sizeStatus: [{size: 34, countInStock: 34}, {size: 34, countInStock: 34}],
            }))
            alert("111")
        }
        else{
            message.error(t('Fill the form.1'), 1)
        }
    }
    const addToStatus = (e) => {
        if(statusSize == "" || statusCountInStock == "")
            message.error(t('Fill the form.1'), 1)
        else{
            //setStatus(status.concat(statusSize, statusCountInStock))
            setStatus({
                ...status,
                ['size']: statusSize,
                ['countInStock']: statusCountInStock,
              });
            setStatusArray(statusArray.concat(status));
        }
    }

    const addToDesc = (e) => {
        e.target.name == "care" ? setdescCare(e.target.value) : e.target.name == "material" ? setMaterial(e.target.value) :setColor(e.target.value)
        setDesc({
            ...desc,
            [e.target.name]: e.target.value,
            });
    }

    const addToPrice = (e) => {
        e.target.name == "digital" ? setPriceDigital(e.target.value) : setPriceReal(e.target.value)
        setPrice({
            ...priceDR,
            [e.target.name]: e.target.value,
            });
    }

    const addToName = (e) => {
        e.target.name == "nameRus" ? setNameRus(e.target.value) : setNameEng(e.target.value)
        setName({
            ...name,
            [e.target.name]: e.target.value,
            });
    }
    return ( 
    <FormCont className = "FormCont">
         <Row className = 'justify-content-md-center'>
             <h3>Add details for product</h3>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message>{errorUpdate}</Message>}
        <Form>
            <Form.Group controlId='nameRus'>
                <Form.Label>name(rus)</Form.Label>
                <Form.Control required type = "text" name="nameRus" placeholder = {!nameR ?'enter name(rus)' : nameR} onChange = {(e) => addToName(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='nameEng'>
                <Form.Label>name(eng)</Form.Label>
                <Form.Control required type = "text" name="nameEng" placeholder = {!nameE ? 'enter name(eng)': nameE} onChange = {(e) => addToName(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>image</Form.Label>
                <Form.Control required type = "text" placeholder = {!image ? 'enter location to image': image} onChange = {(e) => setImage(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='model'>
                <Form.Label>model</Form.Label>
                <Form.Control required type = "text" placeholder = {!model ? 'enter location to 3D-model': model} onChange = {(e) => setModel(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceDigital'>
                <Form.Label>price for digital clothes</Form.Label>
                <Form.Control required type = "text" name="digital" placeholder = {!priceD ? 'enter price': priceD} onChange = {(e) => addToPrice(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceReal'>
                <Form.Label>price for real clothes</Form.Label>
                <Form.Control required type = "text" name="real" placeholder = {!priceR ? 'enter price': priceR} onChange = {(e) => addToPrice(e)}></Form.Control>
            </Form.Group> 
            <Form.Group controlId='descCare'>
                <Form.Label>description: care</Form.Label>
                <Form.Control required type = "text" name="care" placeholder = {!descCare ? 'enter care for product': descCare} onChange = {(e) => addToDesc(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='descCare'>
                <Form.Label>description: material</Form.Label>
                <Form.Control required type = "text" name="material" placeholder = {!descMaterial ? 'enter material of product': descMaterial} onChange = {(e) => addToDesc(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='descColor'>
                <Form.Label>description: color</Form.Label>
                <Form.Control required type = "text" name="color" placeholder = {!descColor ? 'enter color of product': descColor} onChange = {(e) => addToDesc(e)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='statusSize'>
                <Form.Label>status of clothes</Form.Label>
                <Row>
                    <Col>
                        <Form.Control required type = "text" name="size" placeholder = {!statusSize ? 'enter size': statusSize} onChange = {(e) => setSize(e)}></Form.Control>
                    </Col>
                    <Col>
                        <Form.Control required type = "text" name="countInStock" placeholder = {!statusCountInStock ? 'enter count in stock for size': statusCountInStock} onChange = {(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Col>
                    <Col>
                        <div className = 'nav-but2' onClick = {addToStatus}>{t('Add product status.1')}</div>
                    </Col>
                </Row>
            </Form.Group>
            <div className = 'nav-but2' onClick = {handleCheckout}>{t('Add product.1')}</div>
        </Form>
        </Row>
    </FormCont>

    )
}

export default EditScreen