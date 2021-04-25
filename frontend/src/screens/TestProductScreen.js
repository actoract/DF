import React, {useState, useEffect, Suspense, useRef} from 'react'
import { useTranslation } from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Card } from 'react-bootstrap'
import ItemList from '../components/itemList'
import { Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Canvas, useFrame,extend, useThree } from 'react-three-fiber'
import DemoScene from "../components/demoScene"
import Loader from "../components/loader"
import Message from "../components/message"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {testproductDetAction} from '../actions/testproductsActions'
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
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[2, 2, 2]}>
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
  const testproductDet = useSelector(state => state.testproductDet)
  const {testproduct, loadingVal, error} = testproductDet
  useEffect (() => {
    dispatch(testproductDetAction(match.params.id))
  }, [dispatch, match])

  const { t } = useTranslation(); 
  //const [testproduct, setTestProduct] = useState({});

    return (
        <div className = "mainProduct"> 
        {loadingVal ? <Loader loadingVal = {loadingVal}/>: error ? <Message>{error}</Message>  : 
          <Row className='justify-content-center'>
            <Col md = {6}>
            <div className = "canvasP">
              <Canvas style={{ background: "white" }} >
                <CameraControls />
                <ambientLight intensity={0.3} />
                <directionalLight position = {[10, 10, 5]} intensity={1} />
                <Suspense fallback={<Loading />}>
                  <DemoScene 
                    position={[0, -11, 0]}
                    scale={[3, 3, 3]}
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
              
              <div className = "text_details">2. {t('Step3.1')}</div>
              <Rate className = "ratecomp" defaultValue={3} character={({ index }) => customIcons[index + 1]} />
              <div className = "text_details">3. {t('Step4.1')}</div>
              <br />
            </div>
          </Row>
        }
        </div>
    )
}

export default TestProductScreen
