import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import { useTranslation } from 'react-i18next'
import {Col, Row, Image} from 'react-bootstrap'
import {PRODUCTS_CREATE_RESET} from '../constants/storeConst'
import {productsListAction, deleteProductAction, createProductAction} from '../actions/productsActions'
import { Popconfirm} from 'antd';
import { Suspense } from 'react'
import add from './add.png';
const Message = React.lazy(() => import('../components/message'));

const ManageProdScreen = ({history, match}) => {
    const productId = match.params.id
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.productsList)
    const { products, loading, error  } = productsList

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete  } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userDet} = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct  } = productCreate

    const { t } = useTranslation()
    
    useEffect(() => {
        dispatch({type: PRODUCTS_CREATE_RESET})

        if(!userDet || !userDet.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch(productsListAction())
        }
    }, [dispatch, history, userDet, successDelete, successCreate, createdProduct])

    const addHandle = (d) => {
        dispatch(createProductAction())
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
        <Suspense fallback={<Loader/>}>
            <Row>
                <h3>{t('Products.1')}</h3> 
                <Image src = {add} alt={add} className="add" onClick={addHandle}/>
            </Row>
            {loadingCreate && <Loader loadingVal = {loadingCreate}/>}
            {errorCreate && <Message>{errorCreate}</Message>}
            {loadingDelete && <Loader loadingVal = {loading}/>}
            {errorDelete && <Message>{errorDelete}</Message>}
            {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
            <>
            <Row  key = "header" className="text_details">
                <Col md={1} className =""><strong>{t('Image.1')}</strong></Col> 
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Name.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Digital price.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('Real price.1')}</strong></Col> 
            </Row>
            {products.map(item => (
                <Popconfirm
                title= {t('Are you sure to delete this product?.1')}
                onConfirm={() => confirmDelete(item._id)}
                onCancel={cancelDelete}
                okText={t('Yes.1')}
                cancelText={t('No.1')}
                >
                <Row key={item._id} className = "CardDetails2 details">
                    <div className = "CloseBut" >
                        ✕
                    </div>
                    <Col md={1}><Image src = {item.image} alt={item.name} fluid rounded/></Col>
                    <Col md={4}>{item._id}</Col>
                    <Col md={2}>{item.name.nameRus}</Col>
                    <Col md={2}>{item.price.priceDigital}</Col>
                    <Col md={2}>{item.price.priceReal}</Col>
                </Row>
                </Popconfirm>
            ))}
            </>
           }
        </Suspense>
    )
}
export default ManageProdScreen
