import React, {useState, useEffect, Suspense} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {testproductsListAction} from '../actions/testproductsActions'
import {Row, Col} from 'react-bootstrap'
import Loader from '../components/loader'
const Message = React.lazy(() => import('../components/message'));
const TestProduct = React.lazy(() => import('../components/test_products'));

const TestScreen = () => {
    const dispatch = useDispatch()
    const testproductsList = useSelector(state => state.testproductsList)
    const { testproducts, loadingVal, error  } = testproductsList
    
    useEffect(() => {
        dispatch(testproductsListAction())
    }, [dispatch])

    return (
        <div className = "mainStore">
            <Suspense fallback={<Loader/>}>
            {loadingVal ? <Loader/> : error ? <Message>{error}</Message> : 
                <Row>
                        {testproducts.map((testproducts, i) => (
                            <Col sm={12} md={6} lg={4} xl={4} key = {i}>
                                <TestProduct testproducts = {testproducts}/>
                            </Col>
                        ))}
                </Row>
            }
            </Suspense>
        </div>
    )
}

export default TestScreen
