import React, {useState, useEffect, Suspense, useRef} from 'react'
import { useTranslation } from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import ItemList from '../components/itemList'
import { Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Canvas, useFrame,extend, useThree } from 'react-three-fiber'
import DemoScene from "../components/demoScene"
import Loader from "../components/loader"
import Message from "../components/message"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {testproductDetAction, reviewTestProductAction} from '../actions/testproductsActions'
import {TEST_PRODUCTS_REVIEW_RESET} from '../constants/storeConst'
import { Input } from 'antd';
import { message } from 'antd';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

extend({ OrbitControls }); 
const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

const TestProductScreen = ({match}) => {

  const dispatch = useDispatch()

  const [rating, setRate] = useState(0)
  const [comment, setComment] = useState('')

  const testproductDet = useSelector(state => state.testproductDet)
  const {testproduct, loadingVal, error} = testproductDet

  const testproductReview = useSelector(state => state.testproductReview)
  const {success: successReview, error: errorReview} = testproductReview

  const userLogin = useSelector(state => state.userLogin)
  const {userDet} = userLogin
  
  const { TextArea } = Input;
  
  useEffect (() => {
    if(successReview){
      message.success(t('Review is added.1'), 1);
    }
    else if(errorReview){
      message.error(t('Error'), 1);
    }
    setRate(0)
    setComment('')
    dispatch({type: TEST_PRODUCTS_REVIEW_RESET})
    dispatch(testproductDetAction(match.params.id))
  }, [dispatch, match])

  const { t } = useTranslation(); 

  const handleSubmit = (e) => {
    e.preventDefault()
    if(userDet){
      dispatch(reviewTestProductAction(match.params.id, {rating,comment}))
    }
    else if(!rating || !comment){
      message.error(t('Fill the form.1'), 1);
    }
    else{
      message.error(t('Please login in order to submit review.1'), 1);
    }
  }
  //const [testproduct, setTestProduct] = useState({});

    return (
        <div> 
          {successReview && message.success(t('Review is added.1'), 1)}
          {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
          <Row>
            <Col md = {6}>
            <div className = "canvasP">
              <Canvas style={{ background: "#c3ab93" }} >
                <CameraControls />
                <hemisphereLight intensity={1} />
                <directionalLight position = {[10, 10, 5]} intensity={1} />
                <Suspense fallback={<Loading />}>
                  <DemoScene 
                    position={[0, 0, 0]}
                    scale={[5, 5, 5]}
                    model = {testproduct.model}/>
                </Suspense>
              </Canvas>
            </div>
            </Col>
            <div className = "CardDetails">
              <h5><strong >{testproduct.name.nameRus}/{testproduct.name.nameEng}</strong></h5>
              <div className = "text_details">1. {t('Step2.1')}</div>
              <Card>
              <ListGroup variant = 'flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                        {t('Color.1')}
                        </Col>
                        <Col>
                        <div value={testproduct.description.color} className="card-panel" key = {testproduct.description.color.toString()}>
                              {testproduct.description.color}
                            </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ItemList text = "Care.1" list_item = {testproduct.description.care}/>
                    <ItemList text = "Material.1" list_item = {testproduct.description.material}/>
                </ListGroup>
              </Card>
              {errorReview && message.error(errorReview, 1)}
              <div className = "text_details">2. {t('Step3.1')}</div>
              <Rate className = "ratecomp" defaultValue={3} character={({ index }) => customIcons[index + 1]} onChange={value => setRate(value)}/>
              <div className = "text_details">3. {t('Step4.1')}</div>
              <TextArea rows={4} onChange={e => setComment(e.target.value)} />
              <button className="AddBut" onClick={e => handleSubmit(e)}>
                {t('submit.1')}
              </button>
              <br />
            </div>
          </Row>
        }
        </div>
    )
}

export default TestProductScreen
