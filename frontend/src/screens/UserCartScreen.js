import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, Form, Container} from 'react-bootstrap'
import {addToCart, removeFromCart, changeCart} from '../actions/cartAction'
import { message } from 'antd';
import smile from './smile.jpg';
import '../styles/userCard.css'
import {BrowserView, MobileView} from 'react-device-detect';
//const smile = React.lazy(() => import('./smile.jpg'));

const UserCartScreen = ({match, location, history}) => {
    const productId = match.params.id
    const { t } = useTranslation(); 

    const qty = location.search ? Number(location.search.substring(
        location.search.lastIndexOf("qty=") + 4, 
        location.search.lastIndexOf("?type"))) : 1
    const type = location.search ? location.search.substring(
        location.search.lastIndexOf("type=") + 5, 
        location.search.lastIndexOf("?size")) : ""
    const size = location.search ? location.search.split('size=').pop() : ""
    const dispatch = useDispatch()
    const userCart = useSelector(state => state.userCart)
    const {cartItems} = userCart
    const [qtylimit, setQty] = useState()
    const [image, setImage] = useState(false);
    useEffect (() => {
        if(productId){
            dispatch(addToCart(cartItems.length + 1, productId, qty, type, size, 0))
        }
    }, [dispatch, productId, qty, type, size])
    
    const handleRemove = (product, size, type) => {
        dispatch(removeFromCart(product, size, type))
    }

   const handleCheckout = () => {

        cartItems.forEach(function(item, i, cartItems) {
            if(item.custImage == ""){
                message.error(t('Upload image.1'), 3)
                return
            }
            else if(item.custImage !== "" && i == cartItems.length - 1){
                history.push('/login?redirect=deliveryaddress')
            }
        })
   }
   const handleQtyChange = (e, item) => {

       if(Number(item.maxQty) < Number(e.target.value)){
            message.error(t('Count in stock is less for this item.1'), 3);
            dispatch(changeCart(item.id, item.product, item.maxQty, item.type, item.size, item.maxQty, ""))
            setQty(item.maxQty)
       }
       else if (e.target.value < 1 && e.target.value){
            dispatch(changeCart(item.id, item.product, 1, item.type, item.size, item.maxQty, ""))
            setQty(1)
       }
       else{
            dispatch(changeCart(item.id, item.product, e.target.value, item.type, item.size, item.maxQty, ""))
            setQty(e.target.value)
       }
   }
   const uploadImage = (e, item) => {
        e.preventDefault();
        const { files } = e.target;
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", ()=>{
        const file = myFileItemReader.result
        setImage(true)
        if(file){
            dispatch(changeCart(
                item.id,
                item.product, 
                item.isizeStatus, 
                item.type, 
                item.size, 
                item.countInStock,
                file)
            )}
        }, false)
        myFileItemReader.readAsDataURL(files[0])
    }
    return (
        <div>
            {cartItems.length === 0 ?  (
                <Container className="EmptyCard">
                    <Row className="justify-content-md-center">
                        <img src={smile}  className = "imageEmptyStore"/>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h5 className = "textEmptyStore">
                        {t('Your cart is empty.1')}
                        </h5>
                    </Row>
                </Container>) :
            (<>
            <BrowserView className="cardDetils">
                    <div className = "totalInfo">
                        <p><strong>{t('Total number.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.qty), 0)}</p>
                        <p><strong>{t('Total price.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.price) * Number(current.qty), 0)}</p>
                        <div className = 'chechoutButton' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>  
                    </div>
                    <>
                    {cartItems.map(item => (
                        <div className = "cardItem" key = {item.product + "/" + item.size}>
                            <div className = "closeButton" onClick = {() => handleRemove(item.product, item.size, item.type)}>
                                ✕
                            </div>
                            <div className="cardItemRow">
                                <div>
                                    <img src = {item.image} alt={item.name}  className="productImage"/>
                                </div>
                                <div>
                                    <Link to = {`/products/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                                </div>
                                <div>
                                    <strong>{t('Price.1')}: </strong> {item.price}
                                </div>
                                <div>
                                    <strong>{t('Type.1')}: </strong>{item.type == "rc" ? t('RC.1') :  t('DC.1')}
                                </div>
                                {item.type == "rc" ?
                                    <div>
                                        <strong>{t('Quantity.1')}: </strong>
                                        <Form.Control required type = "number" value={item.qty} name="qty"  
                                        onChange = {(e) => handleQtyChange(e, item)}></Form.Control>
                                    </div > :
                                    <div>
                                        <label className="uploadButton">
                                        <strong>{t('Upload Image.1')} </strong>
                                        <input type="file" accept="image/*"  onChange={e => uploadImage(e, item)} className = 'button_for_everything'/>
                                        </label>
                                        {image ? <img src={item.custImage} alt={item.name.nameRus} className="uploadedImage"/>: ""}
                                    </div>
                                }
                                <div>
                                    {item.type == "rc" ?
                                        <div>
                                            <strong>{t('Size.1')}: </strong>{item.size}
                                        </div> :
                                        <div>
                                            <strong>{t('Size.1')}: </strong> {t('unified.1')}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                    </>
                </BrowserView>
                <MobileView className="cardDetils_Mobile"> 
                    <div className = "totalInfo">
                        <p><strong>{t('Total number.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.qty), 0)}</p>
                        <p><strong>{t('Total price.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.price) * Number(current.qty), 0)}</p>
                        <div className = 'nav-but2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>  
                    </div>
                    <>
                    {cartItems.map(item => (
                        <div className = "cardItem" key = {item.product + "/" + item.size}>
                            <div className = "CloseBut" onClick = {() => handleRemove(item.product, item.size, item.type)}>
                                ✕
                            </div>
                            <Row>
                                <Col  span={2}>
                                    <Image src = {item.image} alt={item.name} fluid rounded className="imageInCard"/>
                                </Col>
                                <Col  span={2}>
                                    <Link to = {`/products/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link><br/>
                                    {item.type == "rc" ?
                                    <>
                                        <strong>{t('Quantity.1')}: </strong>
                                        <Form.Control required type = "number" value={item.qty} name="qty"  
                                        onChange = {(e) => handleQtyChange(e, item)}></Form.Control>
                                    </> :
                                    <>
                                        <label className="Upload">
                                        <strong>{t('Upload Image.1')} </strong>
                                        <input type="file" accept="image/*"  onChange={e => uploadImage(e, item)} className = 'button_for_everything'/>
                                        </label>
                                        {image ? <Image src={item.custImage} alt={item.name.nameRus} fluid rounded></Image> : ""}
                                    </>
                                    }
                                </Col>
                                <Col  span={2}>
                                    <strong>{t('Price.1')}: </strong> {item.price}<br/>
                                    <strong>{t('Type.1')}: </strong>{item.type == "rc" ? t('RC.1') :  t('DC.1')}<br/>
                                    {item.type == "rc" ?
                                        <>
                                            <strong>{t('Size.1')}: </strong>{item.size}<br/>
                                        </> :
                                        <>
                                            <strong>{t('Size.1')}: </strong> {t('unified.1')}<br/>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </div>
                    ))}
                    </>
                </MobileView>
                </>
            )}
        </div>
    )
}

export default UserCartScreen