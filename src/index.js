import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import MyThree from './App';
import Circle from './Circle';
// import { Canvas } from '@react-three/fiber';
import { Suspense } from "react";
import Modal from './Modal';
import { Environment, OrbitControls } from "@react-three/drei";
import Sphere from './Sphere';
import Canvas from './Canvas';
import CanvasComponent from './CanvasComponent';
import LineDrawing from './LineDrawing';
import Geometries from './Geometries';
import Example from './Example';
import Drag from './Drag';
import DrawShapes from './DrawShapes';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <MyThree/> */}
    <Circle />
    {/* <DrawShapes/> */}
    {/* <Sphere/> */}
    {/* <Canvas/> */}
    {/* <Geometries/> */}
    {/* <Example/> */}
    {/* <Drag/> */}
    {/* <div className="App"> */}
    {/* <div>ksdjvhdks</div> */}
    {/* <Canvas  */}
    {/* // shadowMap={{ enabled: true, type: 'PCFSoft', autoUpdate: true }}
    > */}
     
      {/* <LineDrawing/> */}
    {/* <CuboidScene/>
        <Suspense fallback={null} >
          <Modal  />
          <OrbitControls/>
          <Environment preset="park" background  />
        </Suspense> */}
      {/* </Canvas> */}
      {/* </div> */}
  </>
);


reportWebVitals();
