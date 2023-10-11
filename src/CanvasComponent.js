import React, { Children, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CanvasComponent = () => {
  const lineRef = useRef();
  const [points, setPoints] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const handlePointerDown = (e) => {
    setDrawing(true);
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    console.log("checking coordinates", x,y)
    setPoints([...points, [x, y]]);
  };

  const handlePointerMove = (e) => {
    if (drawing) {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      console.log("checking  hadle pointer move",x,y)
      setPoints([...points, [x, y]]);
    }
  };

  const handlePointerUp = () => {
    setDrawing(false);
  };
  

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.setClearColor("blue");
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* <orbitControls args={[null]} /> */}

      <line ref={lineRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={points.length}
            array={new Float32Array(points.flat())}
            itemSize={20}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="white" linewidth={5} />
      </line>
    </Canvas>
  );
};

export default CanvasComponent;
