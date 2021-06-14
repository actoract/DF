import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { message } from 'antd'
import {Row, Col, ListGroup, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import StepsComp from '../components/steps'
import {addOrder} from '../actions/orderActions'
import { useTranslation } from 'react-i18next'
import { ORDER_ADD_RESET, USER_PROFILE_RESET } from '../constants/storeConst'
import Message from '../components/message'

const PlaceorderScreen = ({history}) => {
    const orderAdd = useSelector(state => state.orderAdd)
    const {loading, order, success, error} = orderAdd
    const dispatch = useDispatch();
    const { t } = useTranslation(); 
    const userCart = useSelector(state => state.userCart)
    var dcItem = userCart.cartItems.find(item => item.type == "dc");
    var rcItem = userCart.cartItems.find(item => item.type == "rc");
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const {loading: userLoading, error: userError, userDet} = userLogin

    useEffect(() => {
        if(!userDet){
            history.push('/login')
        }
        else if (success) {
          history.push(`/order/${order._id}`)
          dispatch({ type: USER_PROFILE_RESET })
          dispatch({ type: ORDER_ADD_RESET })
        }
        else if(error){
            message.error(error, 3);
        }
    }, [history, success])
    const hadlePlaceOrder = () => {
        dispatch(addOrder({
            orderItems: userCart.cartItems,
            deliveryAddress: userCart.deliveryAddress,
            paymentMethod: userCart.paymentMethod,
            totalPrice: userCart.cartItems.reduce((acc, current) => acc + Number(current.price), 0), 
            isDelivered: false,
            isPaid: true
        }))
    }
    /*const uploadImage = async(e) => {//http request
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try{
            const config ={
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        }
        catch (error){
            console.log(error)
            setUploading(false)
        }
    }*/
    return (
        <>
        {error && <Message>{error}</Message>}
        <Row className = 'justify-content-md-center'>
            <StepsComp step4/>
        </Row>
        <div> 
          <Row >
            <Col md={8} className = "CardDetails cart">
                {rcItem && !dcItem &&
                    <div className = "text_details" key="testdecs1"><strong>{t('Shipping address.1')}: </strong> 
                        {userCart.deliveryAddress.address},
                        {userCart.deliveryAddress.city},
                        {userCart.deliveryAddress.postCode},
                        {userCart.deliveryAddress.country}
                    </div>
                }
                {!rcItem && dcItem &&
                    <div className = "text_details" key="testdecs1"><strong>{t('Shipping address.1')}: </strong> 
                        {userCart.deliveryAddress.email}
                    </div>
                }
                {rcItem && dcItem &&
                    <div className = "text_details" key="testdecs1"><strong>{t('Shipping address.1')}: </strong> 
                    {userCart.deliveryAddress.address},
                        {userCart.deliveryAddress.city},
                        {userCart.deliveryAddress.postCode},
                        {userCart.deliveryAddress.country},
                        {userCart.deliveryAddress.email}
                    </div>
                }
                <div className = "text_details" key="testdecs2"><strong>{t('Payment method.1')}: </strong> {userCart.paymentMethod}</div>
                <div className = "text_details" key="testdecs3"><strong>{t('Cart items.1')}: </strong></div>
                <ListGroup.Item>
                {userCart.cartItems.length === 0? message.error("Empty cart", 3) : (
                    <ListGroup variant='flush'>
                        {userCart.cartItems.map((item, index) => (
                            <div key={item}>
                                <Row>
                                    <Col md={2}>
                                        <strong>{t('Image.1')}</strong>
                                    </Col>
                                    <Col md={3}>
                                        <strong>{t('Name.1')}</strong>
                                    </Col>
                                    <Col md={2}>
                                        <strong>{t('Type.1')}</strong>
                                    </Col>
                                    <Col md={2}>
                                        <strong>{t('Customer image.1')}</strong>
                                    </Col>
                                    <Col md={2}>
                                        <strong>{t('Total price.1')}</strong>
                                    </Col>
                                </Row>
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name.nameRus} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name.nameRus}/{item.name.nameEng}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.type === "dc" ? "Digital clothes" : "Real clothes"}
                                    </Col>
                                    <Col md={2}>
                                        {item.type === "dc" ? <Image src={item.custImage} alt={item.name.nameRus} fluid rounded></Image> : <div/>}
                                    </Col>
                                   
                                    <Col md={2}>
                                        {item.qty} x {item.price} = {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                )}
                </ListGroup.Item>
            </Col>
            <Col md={2} className = "CardDetails2 placeorder" >
                <p><strong>{t('ORDER SUMMERY.1')}:</strong></p>
                <p><strong>{t('Total number.1')}:</strong> {userCart.cartItems.reduce((acc, current) => acc + current.qty, 0)}</p>
                <p><strong>{t('Total price.1')}:</strong> {userCart.cartItems.reduce((acc, current) => acc + Number(current.price), 0)}</p>
                <div className = 'nav-but2' onClick = {hadlePlaceOrder}>{t('place order.1')}</div> 
            </Col>
          </Row>
        </div>
        </>
    )
}
export default PlaceorderScreen
