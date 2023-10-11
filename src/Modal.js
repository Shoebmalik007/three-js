import React from 'react'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const Modal = () => {


    const gltf = useLoader(GLTFLoader, "https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf");
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
      </>
    );
}

export default Modal
