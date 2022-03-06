import React, { useState, useEffect, Suspense, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from'react-redux'
import {Row, Col, ListGroup, Card, Form } from 'react-bootstrap'
import "./styles.css"
import { Canvas, useFrame,extend, useThree } from 'react-three-fiber'
import Loader from "../components/loader"
import Loading from "../components/loading"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {productDetAction}  from '../actions/productsActions'
import {addToCart} from '../actions/cartAction'
import { message } from 'antd';
const Message = React.lazy(() => import('../components/message'));
const DemoScene = React.lazy(() => import('../components/demoScene'));
const ItemList = React.lazy(() => import('../components/itemList'));

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


const ProductScreen = ({match}) => { 

    const [qty, setQty] = useState("");
    const [size, setSize] = useState("");
    const [maxQty, setMaxQty] = useState("");
    const dispatch = useDispatch()
    const productDet = useSelector(state => state.productDet);
    const {product, loadingVal, error} = productDet
    const { t } = useTranslation(); 
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const userCart = useSelector(state => state.userCart)
    const {cartItems} = userCart

    useEffect(() => {
      dispatch(productDetAction(match.params.id))
      if(qty && size){
        
      }
    }, [dispatch, match])

    const addToCard = () => {
      const exist = cartItems.find(item => item.product === product._id && item.size === size)
      if(type === "" || (type === "rc" && (size === "" || qty === ""))){
        message.error(t('Select product specifications.1'), 1)
      }
      else if(!exist){
        if(type === "rc")
          dispatch(addToCart( cartItems.length + 1, match.params.id, Number(qty), type, size, maxQty, "none"))
        else if(type === "dc")
          dispatch(addToCart( cartItems.length + 1, match.params.id, Number(qty), type, size, maxQty, ""))
        message.success(t('Added.1'), 1)
      }
      else if(exist){
        message.error(t('Item is already added to the cart.1'), 1)
      }
     
    }

    function handleChange(){
      if (document.getElementById("1").value === "dc"){
        setPrice(product.price.priceDigital)
        setType("dc")
      }
      else if (document.getElementById("1").value == "rc"){
        setPrice(product.price.priceReal)
        setType("rc")
      }
    }
    const handleSizeChang = (e) => {
      for (var key in product.sizeStatus) {
        if(key == e.target.value){
          setMaxQty(Number(product.sizeStatus[key])) 
        }
      }
      setSize(e.target.value)
    }

    const handleQtyChange = (e) => {
      if (maxQty < e.target.value){
        message.error(t('Count in stock is less for this item.1'), 1);
        setQty(maxQty)
      }
      else if(e.target.value < 1 && e.target.value){
        setQty(1)
      }
      else{
        setQty(e.target.value)
      }
    }
   


    return (
        <div> 
        {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
        <>
              <div className = "canvasP">
              <Canvas style={{ background: "#c3ab93" }} >
                <CameraControls />
                <hemisphereLight intensity={0.5} />
                <directionalLight position = {[10, 10, 5]} intensity={1} />
                <Suspense fallback={<Loading />}>
                  <DemoScene 
                    position={[0, -11, 0]}
                    scale={[3, 3, 3]}
                    model = {product.model}/>
                </Suspense>
              </Canvas>
            </div>
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
                          <Form.Control as="select"   className = "SelectBut2" id = "2" onChange = {e => handleSizeChang(e)}>
                              <option value="default" key = "default">{t('Choose.1')}</option> 
                              {Object.keys(product.sizeStatus).map(item => (
                              <option value={item} className="card-panel" key = {item}>
                              {item}
                              </option>
                              ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          {t('Quantity.1')}
                        </Col>
                          <Col>
                          <Form.Control required type = "number" name="qty" min={1} placeholder = {t('Quantity.1')} value={qty} onChange = {(e) => handleQtyChange(e)}></Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    </>
                  }
                </ListGroup>
              </Card>
              <button  className = 'AddBut' onClick = {addToCard}> {t('Add.1')}</button>
            </div>
          </>
        }
      </div>
    )
}

export default ProductScreen
