import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from "three";


const DrawShapes = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);

  const handleMouseDown = () => {
    setIsDrawing(true);
    setPoints([]);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPoints((prevPoints) => [...prevPoints, [x, y]]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);

      const shapePoints = points.map(([x, y]) => new THREE.Vector2(x, y));
      const shape = new THREE.Shape(shapePoints);

      const extrudeSettings = { depth: 0.1, bevelEnabled: false };
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const shapeMesh = new THREE.Mesh(geometry, material);

      setCurrentShape(shapeMesh);
    }
  };

//   useFrame(() => {
//     // You can add animation logic here
//   });

  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <Canvas>
        {/* Add lights and camera here */}
        <pointLight position={[10, 10, 10]} />
        <perspectiveCamera makeDefault position={[0, 0, 5]} />

        {/* Render the current shape */}
        {currentShape && <primitive object={currentShape} />}
      </Canvas>
    </div>
  );
};

export default DrawShapes;
