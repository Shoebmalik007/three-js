import React, { Children, useEffect, useRef } from "react";
import * as THREE from "three";

const Drag = () => {
  const newRef = useRef();

  /*SETTINGS*/

  //   const renderer = new THREE.WebGLRenderer()
  //   renderer.setSize(window.innerWidth, window.innerHeight);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0xaaaaaa);
  renderer.setSize(window.innerWidth, window.innerHeight);

  useEffect(() => {
    newRef.current.appendChild(renderer.domElement);
  });
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth,
    window.innerHeight,
    1,
    40
  );
  camera.position.set(2, 2, 6);

  //  controls=new THREE.TrackballControls(camera,renderer.domElement);
  //  controls.rotateSpeed=5;

  /*OBJECTS*/

  //  createGrid();
  //  var light=new THREE.SpotLight(0xffffff,10,20);
  //  light.position.set(-10,10,10);
  //  scene.add(light);

  //1.Create a mesh
  var object = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshLambertMaterial({ color: 0x00aa00, transparent: true })
  );
  //2.create vertexHelpers
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 0.1, 0.1, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );





  const vertices = object.geometry.attributes.position.array;

  var vertexHelpers = [];

  for (let i = 0; i < vertices.length; i += 3) {
    var vertexHelper = sphere.clone();
    var vertexPosition = vertices[i];
    vertexHelper.position.copy(vertexPosition);
    vertexHelper.visible = false;
    vertexHelper.data = { index: i };
    scene.add(vertexHelper);
    vertexHelpers.push(new THREE.Vector2(vertices[i], vertices[i + 1]));
  }

  console.log("chekcing vertex", vertexHelpers);

  scene.add(object);

  return <div ref={newRef}></div>;
};

export default Drag;
