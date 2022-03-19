import React, {useState, useEffect, Suspense} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {testproductsListAction} from '../actions/testproductsActions'
import {Row, Col} from 'antd'
import {BrowserView, MobileView} from 'react-device-detect';
import Loader from '../components/loader'
import '../styles/test.css'
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
        <div className="test">
        <BrowserView>
            <Suspense fallback={<Loader/>}>
            {loadingVal ? <Loader/> : error ? <Message>{error}</Message> : 
                <Row>
                        {testproducts.map((testproducts, i) => (
                            <Col span={8} key = {i}>
                                <TestProduct testproducts = {testproducts}/>
                            </Col>
                        ))}
                </Row>
            }
            </Suspense>
            </BrowserView>
            <MobileView>
                <Suspense fallback={<Loader/>}>
                {loadingVal ? <Loader/> : error ? <Message>{error}</Message> : 
                    <Row>
                            {testproducts.map((testproducts, i) => (
                                <Col key = {i}>
                                    <TestProduct testproducts = {testproducts}/>
                                </Col>
                            ))}
                    </Row>
                }
                </Suspense>
            </MobileView>
        </div>
    )
}

export default TestScreen
