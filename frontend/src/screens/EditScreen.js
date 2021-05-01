import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, Container, Form} from 'react-bootstrap'
import {addToCart, removeFromCart, changeCart} from '../actions/cartAction'
import Uploader from '../components/upload'
import smile from './smile.png';
import { message, Input, Button, Checkbox  } from 'antd';
import FormCont from '../components/form'

const EditScreen = () => {
    const { t } = useTranslation(); 
    const [nameRus, setNameRus] =  useState('')
    const [nameEng, setNameEng] =  useState('')
    const [image, setImage] =  useState('')
    const [model, setModel] =  useState('')
    const [priceDigital, setPriceDigital] =  useState('')
    const [priceReal, setPriceReal] =  useState('')
    const [descCare, setdescCare] =  useState('')
    const [descMaterial, setMaterial] =  useState('')
    const [descColor, setColor] =  useState('')
    
    const [statusSize, setSize] =  useState('')
    const [statusCountInStock, setCountInStock] =  useState('')

    //const [status, setStatus] = useState(['', '']);
    const [statusArray, setStatusArray] = useState([]);
    const [status, setStatus] = useState({
        size: '',
        countInStock: '',
      });
    const handleCheckout = (e) => {
        e.preventDefault();
        if(nameRus && nameEng && image && model && priceDigital && priceReal && descCare && descMaterial && descColor && statusSize && statusCountInStock){
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
    return ( 
    <FormCont className = "FormCont">
         <Row className = 'justify-content-md-center'>
             <h3>Add details for product</h3>
        <Form>
            <Form.Group controlId='nameRus'>
                <Form.Label>name(rus)</Form.Label>
                <Form.Control required type = "text" placeholder = {!nameRus ?'enter name(rus)' : nameRus} onChange = {(e) => setNameRus(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='nameEng'>
                <Form.Label>name(eng)</Form.Label>
                <Form.Control required type = "text" placeholder = {!nameEng ? 'enter name(eng)': nameEng} onChange = {(e) => setNameEng(e.target.value)}></Form.Control>
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
                <Form.Control required type = "text" placeholder = {!priceDigital ? 'enter price': priceDigital} onChange = {(e) => setPriceDigital(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceReal'>
                <Form.Label>price for real clothes</Form.Label>
                <Form.Control required type = "text" placeholder = {!priceReal ? 'enter price': priceReal} onChange = {(e) => setPriceReal(e.target.value)}></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='descCare'>
                <Form.Label>description: care</Form.Label>
                <Form.Control required type = "text" placeholder = {!descCare ? 'enter care for product': descCare} onChange = {(e) => setdescCare(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='descCare'>
                <Form.Label>description: material</Form.Label>
                <Form.Control required type = "text" placeholder = {!descMaterial ? 'enter material of product': descMaterial} onChange = {(e) => setMaterial(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='descColor'>
                <Form.Label>description: color</Form.Label>
                <Form.Control required type = "text" placeholder = {!descColor ? 'enter color of product': descColor} onChange = {(e) => setColor(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='statusSize'>
                <Form.Label>status of clothes</Form.Label>
                <Row>
                    <Col>
                        <Form.Control required type = "text" name="size" placeholder = {!statusSize ? 'enter size': statusSize} onChange = {(e) => setSize(e.target.value)}></Form.Control>
                    </Col>
                    <Col>
                        <Form.Control required type = "text" name="countInStock" placeholder = {!statusCountInStock ? 'enter count in stock for size': statusCountInStock} onChange = {(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Col>
                    <Col>
                        <div className = 'nav-but2' onClick = {addToStatus}>{t('Add product.1')}</div>
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