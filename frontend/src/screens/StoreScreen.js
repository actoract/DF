import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {productsListAction} from '../actions/productsActions'
import Product from '../components/products'
import Loader from '../components/loader'
import Message from '../components/message'



const StoreScreen = () => {
    const dispatch = useDispatch()
    const productsList = useSelector(state => state.productsList)
    const { products, loadingVal, error  } = productsList
    
    useEffect(() => {
        dispatch(productsListAction())
    }, [dispatch])

    return (
        <div className = "mainStore">
            {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
                <Row>
                    {products.map((product, i) => (
                        <Col sm={12} md={6} lg={4} xl={4} key={i}>
                            <Product product = {product} products = {products}/>
                        </Col>
                    ))}
                </Row>
            }
        </div>
    )
}

export default StoreScreen
