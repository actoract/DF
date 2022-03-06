import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, Form, Container} from 'react-bootstrap'
import {addToCart, removeFromCart, changeCart} from '../actions/cartAction'
import { message } from 'antd';
const smile = React.lazy(() => import('./smile.jpg'));

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
        <div className="UserCardDetails">
            {cartItems.length === 0 ?  (
                <Container className="UserCardDetails">
                    <Row className="justify-content-md-center">
                        <img src={smile}  className = "EmptyStore"/>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h5>
                        {t('Your cart is empty.1')}
                        <span>
                        </span>
                        </h5>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h5><Link to='/store' className = "linkStore"> {t('Go back to store.1')} </Link></h5>
                    </Row>
                </Container>) :
            (<Row>
                <Col md={9}>
                {cartItems.map(item => (
                    <div className = "CardDetails2" key = {item.product + "/" + item.size}>
                        <div className = "CloseBut" onClick = {() => handleRemove(item.product, item.size, item.type)}>
                            ✕
                        </div>
                        <Row>
                            <Col  span={2}>
                                <Image src = {item.image} alt={item.name} fluid rounded className="imageInCard"/>
                            </Col>
                            <Col  span={2}>
                                <Link to = {`/products/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                            </Col>
                            <Col  span={2}>
                                <strong>{t('Price.1')}: </strong> {item.price}
                            </Col>
                            <Col  span={2}>
                                <strong>{t('Type.1')}: </strong>{item.type == "rc" ? t('RC.1') :  t('DC.1')}
                            </Col>
                            {item.type == "rc" ?
                                <Col  span={2}>
                                    <strong>{t('Quantity.1')}: </strong>
                                    <Form.Control required type = "number" value={item.qty} name="qty"  
                                    onChange = {(e) => handleQtyChange(e, item)}></Form.Control>
                                </Col > :
                                <Col  span={2}>
                                    <label className="Upload">
                                    <strong>{t('Upload Image.1')} </strong>
                                    <input type="file" accept="image/*"  onChange={e => uploadImage(e, item)} className = 'button_for_everything'/>
                                    </label>
                                    {image ? <Image src={item.custImage} alt={item.name.nameRus} fluid rounded></Image> : ""}
                                </Col>
                            }
                             <Col  span={2}>
                                {item.type == "rc" ?
                                    <Col>
                                        <strong>{t('Size.1')}: </strong>{item.size}
                                    </Col> :
                                    <Col>
                                        <strong>{t('Size.1')}: </strong> {t('unified.1')}
                                    </Col>
                                }
                            </Col>
                        </Row>
                    </div>
                ))}
                </Col>
                <Col md={3}>
                    <div className = "CardDetails2">
                        <p><strong>{t('Total number.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.qty), 0)}</p>
                        <p><strong>{t('Total price.1')}:</strong> {cartItems.reduce((acc, current) => acc + Number(current.price) * Number(current.qty), 0)}</p>
                        <div className = 'nav-but2' onClick = {handleCheckout}>{t('Continue checkout.1')}</div>  
                    </div>
                </Col>
                </Row>
            )}
        </div>
    )
}

export default UserCartScreen