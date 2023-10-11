import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from 'three';

function LineDrawing() {
  const [points, setPoints] = useState([]);
  const lineRef = useRef();

  const addPoint = (event) => {
    const { offsetX, offsetY } = event;
    const point = [(offsetX / window.innerWidth) * 2 - 1, -(offsetY / window.innerHeight) * 2 + 1];
    setPoints((prevPoints) => [...prevPoints, point]);
  };

  useFrame(() => {
    if (lineRef.current) {
      const line = new Line();
      line.geometry.setFromPoints(points);
      lineRef.current.geometry = line.geometry;
    }
  });

  return (
    <Canvas onClick={addPoint}>
      <mesh>
      <primitive position={[10, 0, 0]} />
        <lineBasicMaterial color="blue" />
        <bufferGeometry attach="geometry" />
      </mesh>
    </Canvas>
  );
}

export default LineDrawing;
