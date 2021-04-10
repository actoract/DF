import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {testproductsListAction} from '../actions/testproductsActions'
import {Row, Col} from 'react-bootstrap'
import TestProduct from '../components/test_products'
import Loader from '../components/loader'
import Message from '../components/message'

const TestScreen = () => {
    const dispatch = useDispatch()
    const testproductsList = useSelector(state => state.testproductsList)
    const { testproducts, loadingVal, error  } = testproductsList
    
    useEffect(() => {
        dispatch(testproductsListAction())
    }, [dispatch])

    return (
        <>
        {loadingVal ? <Loader/> : error ? <Message/> : 
            <Row>
                    {testproducts.map((testproducts, i) => (
                        <Col sm={12} md={6} lg={4} xl={4} key = {i}>
                            <TestProduct testproducts = {testproducts}/>
                        </Col>
                    ))}
            </Row>
        }
        </>
    )
}

export default TestScreen
