import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GUI } from "dat.gui";
import { DragControls } from "three/addons/controls/DragControls.js";

const Example = () => {
  const sphereRef = useRef();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    74,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.z = 10;

  useEffect(() => {
    sphereRef.current.appendChild(renderer.domElement);
  });
  //sphere
  const geometry = new THREE.SphereGeometry(2, 5, 5);
  const material = new THREE.MeshBasicMaterial({
    wireframe: false,
    color: "white",
  });

  
  const sphere = new THREE.Mesh(geometry, material);

  var spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(100, 1000, 1000);
scene.add(spotLight);

  

  //box
  const squaregeometry = new THREE.BoxGeometry(2, 2);
  const squareMaterail = new THREE.MeshBasicMaterial({
    wireframe: false,
    color: "white",
  });
  const square = new THREE.Mesh(squaregeometry, squareMaterail);
  square.position.set(0, 5, 0);

  //plane
  const planeGeometry = new THREE.PlaneGeometry(4, 4, 3);
  const planeMaterail = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterail);
  plane.position.set(-4, 1, 0);

  const objects = [];
  objects.push(sphere);
  objects.push(square);
  objects.push(plane);

  const controls = new DragControls(objects, camera, renderer.domElement);

  // sphere.position.set(0,5,0);
  scene.add(sphere);
  scene.add(square);
  scene.add(plane);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.addEventListener("dragstart", function (event) {
      event.object.material.color.set("white");
    });

    // controls.addEventListener('dragend', function (event) {
    //     event.object.material.color.set("blue");
    // });

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    plane.rotation.x += 0.01;
    plane.rotation.y += 0.01;
    square.rotation.x += 0.01;
    square.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();

  const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector3();

let isDragging = false;




  const gui = new GUI();
  const sphereFolder = gui.addFolder("Sphere");
  sphereFolder.add(sphere.rotation, "x", 0, Math.PI * 2);
  sphereFolder.add(sphere.rotation, "y", 0, Math.PI * 2);
  sphereFolder.add(sphere.rotation, "z", 0, Math.PI * 2);
  sphereFolder.open();
  var guiControls = {
    wireframe: false,
  };

  // Add wireframe control to the GUI
  gui.add(guiControls, "wireframe").onChange(function (value) {
    // Toggle wireframe mode for the sphere material
    sphere.material.wireframe = value;
    plane.material.wireframe = value;
    square.material.wireframe = value;
  });
  return <div ref={sphereRef}></div>;
};

export default Example;
