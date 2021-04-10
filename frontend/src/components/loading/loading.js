import React from 'react'
import { Canvas, useFrame,extend, useThree } from 'react-three-fiber'


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
export default Loading