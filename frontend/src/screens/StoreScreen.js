import React, {useEffect, Suspense} from 'react'
import { Popover, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {productsListAction} from '../actions/productsActions'
const Message = React.lazy(() => import('../components/message'));
const Loader = React.lazy(() => import('../components/loader'));
const Product = React.lazy(() => import('../components/products'));

const StoreScreen = () => {
    const dispatch = useDispatch()
    const productsList = useSelector(state => state.productsList)
    const { products, loadingVal, error  } = productsList
 
    useEffect(() => {
        dispatch(productsListAction())
    }, [dispatch])

    const style1= {
        padding: '12px',
        margin: '-60px',
        marginTop: '0px',
        boxSizing: 'border-box',
        height: 'auto',
        backgroundColor: '#F6f6f6',
        zIndex:'0',
        marginBottom: '100px',
    }
    return (
        <div style = {style1}>
            {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
                <Row>
                    {products.map((product, i) => (
                        <Col span={8} key={i}>
                            <Product product = {product} products = {products}/>
                        </Col>
                    ))}
                </Row>
            }
        </div>
    )
}

export default StoreScreen
