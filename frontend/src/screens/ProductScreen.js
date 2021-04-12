import React, { useState, useEffect, Suspense, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from'react-redux'
import {Row, Col, ListGroup, Card, Form } from 'react-bootstrap'
import "./styles.css"
import ItemList from '../components/itemList'
import { Canvas, useFrame,extend, useThree } from 'react-three-fiber'
import DemoScene from "../components/demoScene"
import Loader from "../components/loader"
import Loading from "../components/loading"
import Message from "../components/message"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {productDetAction}  from '../actions/productsActions'
import {addToCart} from '../actions/cartAction'
import { message } from 'antd';

extend({ OrbitControls }); 
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};


const ProductScreen = ({history, match}) => { 

    const [number, setNumber] = useState();
    const [qty, setQty] = useState();
    const [size, setSize] = useState();
    const dispatch = useDispatch()
    const productDet = useSelector(state => state.productDet);
    const {product, loadingVal, error} = productDet
    const { t } = useTranslation(); 
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [status, setStatus] = useState();
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
      dispatch(productDetAction(match.params.id))
    }, [dispatch, match])

    const addToCard = () => {
      dispatch(addToCart( cartItems.length + 1, match.params.id, Number(qty), type, Number(size), number));
      message.success(t('Added.1'), 3);
      //history.push(`/cart/${match.params.id}?qty=${qty}?type=${type}?size=${size}`)

      /*const keys = Object.keys(item.sizeStatus); 
      const  exist = product.find(x => x.id == product.id && Number(size) == Number(.size));
      console.log(exist)
      if (exist){
          message.success("Exist", 3);
      }
      else{
          for (let key of keys) {
              if (item.sizeStatus[key].size == e.target.value){
                  //qty = cartItems.sizeStatus[key].countInStock
                  dispatch(changeCart(item.product, 
                      item.sizeStatus[key].countInStock, 
                      item.type, Number(e.target.value), 
                      item.sizeStatus[key].countInStock))
              }
          }
      }*/
    }

    function handleChange(){
      if (document.getElementById("1").value == "dc"){
        setPrice(product.price.priceDigital)
        setType("dc")
      }
      else if (document.getElementById("1").value == "rc"){
        setPrice(product.price.priceReal)
        setType("rc")
      }
    }
    function HandleSizeChange(){
      const keys = Object.keys(product.sizeStatus); 
      setSize(document.getElementById("2").value)
      for (let key of keys) {
        if (product.sizeStatus[key].size == document.getElementById("2").value){
          if (product.sizeStatus[key].countInStock > 0){
            setStatus(t('In stock.1'));
            setNumber(product.sizeStatus[key].countInStock)
          }
          else{
            setStatus(t('Out of stock.1'));
            setNumber(product.sizeStatus[key].countInStock)
          }
        }
      }
    }


    return (
        <div className = "mainProduct"> 
        {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
          <Row>
            <Col md = {6}>
              <div className = "canvasP">
              <Canvas style={{ background: "pink" }} >
                <CameraControls />
                <ambientLight intensity={0.3} />
                <directionalLight position = {[10, 10, 5]} intensity={1} />
                <Suspense fallback={<Loading />}>
                  <DemoScene 
                    position={[0, -11, 0]}
                    scale={[3, 3, 3]}
                    model = {product.model}/>
                </Suspense>
              </Canvas>
            </div>
            </Col>
            <Col md={6}>
          <div className = "CardDetails">
            <h5><strong >{product.name.nameRus}/{product.name.nameEng}</strong></h5>              
            <Form.Label>1. {t('Step1.1')}</Form.Label>
              <Form.Control as='select' id ="1" defaultValue="Choose..."   onChange = {handleChange}>  
                <option value="default" key = "default">{t('Choose.1')}</option> 
                <option value="dc" key = "dc">{t('DC.1')}</option>
                <option value="rc" key = "rc">{t('RC.1')}</option>
              </Form.Control>
              <div className = "text_details">2. {t('Step2.1')}</div>
              <Card>
                <ListGroup variant = 'flush'>
                    <strong><ItemList text = "Price.1" list_item = {price}/></strong>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                        {t('Color.1')}
                        </Col>
                        <Col>
                            <div value={product.description.color} className="card-panel" key = {product.description.color.toString()}>
                              {product.description.color}
                            </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ItemList text = "Care.1" list_item = {product.description.care} />
                    <ItemList text = "Material.1" list_item = {product.description.material} />
                 
                    {type == "rc" &&
                    <>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          {t('Size.1')}
                        </Col>
                          <Col>
                          <Form.Control as="select"   className = "SelectBut2" id = "2" onChange = {HandleSizeChange}>
                              <option value="default" key = "default">{t('Choose.1')}</option> 
                              {Object.values(product.sizeStatus).map(item => (
                              <option value={item.size} className="card-panel" key = {item.size}>
                              {item.size}
                              </option>
                              ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    </>
                  }
                </ListGroup>
                {number > 0 && //??????
                <div>
                <ItemList text = "Status.1" list_item = {status}/>
                <ListGroup.Item text = "Number.1" list_item = {number}>
                  <Row>
                    <Col>{t("Quantity.1")}</Col>
                    <Col>
                      <Form.Control as="select" value={qty} onChange = {(e) => setQty(Number(e.target.value))}>
                        <option value="default" key = "default">{t("Choose.1")}</option> 
                        {[...Array(number).keys()].map(x => (
                          <option key = {x + 1} value = {x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                </div>
              }
              </Card>
              {type == "dc" || type == "rc" && size != undefined && qty != undefined ?
                <div  className = 'add' onClick = {addToCard}> {t('Add.1')}</div> :
                <div className = 'add'>{t('Add.1')}</div> 
              }
            </div>
            </Col>
          </Row>
        }
      </div>
    )
}

export default ProductScreen
