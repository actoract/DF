import React, {useEffect, Suspense} from 'react'
import {Row, Col} from 'react-bootstrap'
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

    return (
        <div className = "mainStore">
            <Suspense fallback={<Loader/>}>
            {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
                <Row>
                    {products.map((product, i) => (
                        <Col sm={12} md={6} lg={4} xl={4} key={i}>
                            <Product product = {product} products = {products}/>
                        </Col>
                    ))}
                </Row>
            }
            </Suspense>
        </div>
    )
}

export default StoreScreen
