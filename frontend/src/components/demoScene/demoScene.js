import React, {useRef} from "react";
import {useGLTF} from '@react-three/drei'


function DemoScene(props) {

  const nodes  = useGLTF(props.model, true);
  return (
    <>
    <primitive object={nodes.scene} diapose={null}/>
    </>
  );
}
export default DemoScene
