import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

const Canvas = () => {
  const canvasRef = useRef();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          // child.rotation.x += 0.01;
          // child.rotation.y += 0.01;
        }
      });

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  const clearScene = () => {
    scene.children.forEach((object) => {
      scene.remove(object);
    });
  };

  const addGeometry = (currentGeometry) => {
      console.log("checking geometry", currentGeometry);
      clearScene()
    if (currentGeometry === 'box') {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

    } else if (currentGeometry === 'sphere') {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    } else if (currentGeometry === 'cylinder') {
      const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);

      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const cylinder = new THREE.Mesh(geometry, material);
      scene.add(cylinder);
      
    }else if(currentGeometry === "line"){
        const points = [];
    points.push(new THREE.Vector3(-1, 0, 0));
    points.push(new THREE.Vector3(1, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    }
  };

  return (
    <div>
      <div ref={canvasRef}></div>

      <button onClick={()=>addGeometry("box")}>Add Box</button>
      <button onClick={()=>addGeometry("sphere")}>Add Sphere</button>
      <button onClick={()=>addGeometry("cylinder")}>Add Cylinder</button>
      <button onClick={()=>addGeometry("line")}>Add Line</button>
      <button onClick={() => scene.clear()}>Clear</button>
    </div>
  );
};

export default Canvas;
