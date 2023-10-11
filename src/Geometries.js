import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui'


const Geometries = () => {
  const cuboidRef = useRef();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.z = 5;

  useEffect(() => {
    cuboidRef.current.appendChild(renderer.domElement);



    
    // return () => {
        //   scene.remove(box);
        //   renderer.dispose();
        // };
    }, []);
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'green' });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);
    
    
    const animate = () => {
      requestAnimationFrame(animate);
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  const gui = new GUI()
const cubeFolder = gui.addFolder('box')
cubeFolder.add(box.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(box.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(box.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()
var params = {
    color: 0xff00ff
};
cameraFolder.addColor( params, 'color' )
      .onChange( function() { box.material.color.set( params.color ); } );

cameraFolder.open();


  return <div ref={cuboidRef}></div>;
};

export default Geometries;
