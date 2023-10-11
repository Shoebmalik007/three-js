import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./index.css";
import * as dat from "dat.gui";
import { DragControls } from "three/addons/controls/DragControls.js";
import { OBJExporter } from "three/addons/exporters/OBJExporter.js";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { VertexNode } from 'three/addons/math/ConvexHull.js';





const Circle = () => {
  const circleRef = useRef(null);

  const objects = [];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // const renderer = new THREE.WebGLRenderer();
  // // renderer.setSize(200, window.innerHeight);

  // // console.log(renderer)
  // renderer.domElement.style.display = 'flex';
  // renderer.domElement.style.justifyContent = 'center';
  // renderer.domElement.style.alignItems = 'center';

  // const container = document.createElement('div');
  // document.body.appendChild(container);

  // container.style.display = 'flex';
  // container.style.justifyContent = 'center';
  // container.style.alignItems = 'center';

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // container.appendChild(renderer.domElement);

  const rectangleGeometry = new THREE.PlaneGeometry(2, 2, 2);
  const rectangleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: false,
  });

  const rectangleMesh = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
  scene.add(rectangleMesh);

  const vertices = rectangleMesh.geometry.attributes.position.array;

  // Create an array to store the vertex markers
  const vertexMarkers = [];
  
  // Create a function to add vertex markers
  function addVertexMarker(position) {
    const markerGeometry = new THREE.SphereGeometry(0.05); // Small sphere as a marker
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
    markerMesh.position.copy(position);
    rectangleMesh.add(markerMesh); // Add the marker to the rectangleMesh
    vertexMarkers.push(markerMesh);
  }
  
  // Loop through the vertices and add markers
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];
  
    // Create a vertex marker at the vertex position
    addVertexMarker(new THREE.Vector3(x, y, z));
  }

  // const helper = new VertexNormalsHelper( rectangleMesh,0.3, 0xff0000 );
  // console.log("dvjdhbdk",helper)
  
  // scene.add(helper);



  console.log("reacsdvsvdsdv",rectangleMesh)



//   const transformControls = new TransformControls(camera, renderer.domElement)
//   transformControls.attach(rectangleMesh)
//   scene.add(transformControls)

//   window.addEventListener('keydown', function (event) {
//     switch (event.code) {
//         case 'KeyG':
//             transformControls.setMode('translate')
//             break
//         case 'KeyR':
//             transformControls.setMode('rotate')
//             break
//         case 'KeyS':
//             transformControls.setMode('scale')
//             break
//     }
// })

// Assuming you've already created the rectangleMesh

let selectedVertex = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const plane = new THREE.Plane();

// Handle mouse down event
document.addEventListener('mousedown', (event) => {
  event.preventDefault();

  const canvasBounds = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
  mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(rectangleMesh);

  if (intersects.length > 0) {
    const intersectionPoint = intersects[0].point;
    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), intersectionPoint);

    const vertices = rectangleMesh.geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i += 3) {
      const vertex = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
      const distance = vertex.distanceTo(intersectionPoint);

      if (distance < 0.1) { // Adjust the threshold for vertex selection
        selectedVertex = { index: i / 3, originalPosition: vertex.clone() };
        break;
      }
    }
  }
});

// Handle mouse move event
document.addEventListener('mousemove', (event) => {
  event.preventDefault();

  if (selectedVertex) {
    const canvasBounds = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    const vertices = rectangleMesh.geometry.attributes.position.array;
    vertices[selectedVertex.index * 3] = intersection.x;
    vertices[selectedVertex.index * 3 + 1] = intersection.y;
    vertices[selectedVertex.index * 3 + 2] = intersection.z;

    rectangleMesh.geometry.attributes.position.needsUpdate = true;
  }
});

// Handle mouse up event
document.addEventListener('mouseup', () => {
  selectedVertex = null;
});



  let rectangle;
  const createRectangle = () => {
    const rectangleGeometry = new THREE.PlaneGeometry(2, 2);
    const rectangleMaterial = new THREE.MeshBasicMaterial({
      color: "white",
      wireframe: false,
    });
    rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    scene.add(rectangle);
    

    rectangle.position.set(2, 2, 0);
    objects.push(rectangle);
  };


// rectangle.centroid.divideScalar(rectangle.vertices.length);
  let square;
  const createSquare = () => {
    const rectangleGeometry = new THREE.BoxGeometry(2, 2);
    const rectangleMaterial = new THREE.MeshBasicMaterial({
      color: "white",
      wireframe: false,
    });
    square = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    scene.add(square);
    console.log("checking square",square)

    square.position.set(2, -2, 0);
    objects.push(square);
  };


  const createTriangle = () => {
    const shape = new THREE.Shape();

    const x = 0;
    const y = 0;

    shape.moveTo(x - 2, y - 2);
    shape.lineTo(x + 2, y - 2);
    shape.lineTo(x, y + 1);

    const triangleGeometry = new THREE.ShapeGeometry(shape);
    const triangleMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);

    triangle.position.set(-2, -2, 0);

    scene.add(triangle);
    objects.push(triangle);
  };

  objects.push(rectangleMesh);

  // objects.push(created);

  const controls = new DragControls(objects, camera, renderer.domElement);
  useEffect(() => {
    circleRef?.current?.appendChild(renderer.domElement);

  }, []);
  const gui = new dat.GUI();

  console.log("sfsvsvsv", gui);

  // // const guiDOM = gui.domElement;

  

  // // guiDOM.style.color = "yellow";
  gui.add(rectangleMesh.position, "x", -10, 10);
  gui.add(rectangleMesh.position, "y", -10, 10);
  gui.add(rectangleMesh.position, "z", -10, 10);




  const resizeFolder = gui.addFolder("Resize");

  resizeFolder.add(rectangleMesh.scale, "x", 0.1, 10);
  resizeFolder.add(rectangleMesh.scale, "y", 0.1, 10);
  resizeFolder.add(rectangleMesh.scale, "z", 0.1, 10);
  resizeFolder.open();

  // controls.addEventListener("dragstart", function (event) {
  //   rectangleMesh.scale.set( rectangleMesh.geometry.parameters.height+1, rectangleMesh.geometry.parameters.width+1,rectangleMesh.geometry.parameters.widthSegments+1);
  //   // rectangleMesh.scale.set( 1, 1,1);
  // });



  const addGeometryFolder = gui.addFolder("Add Zones");
  addGeometryFolder
    .add({ createRectangle }, "createRectangle")
    .name("Rectangle");
  addGeometryFolder.add({ createSquare }, "createSquare").name("Square");
  addGeometryFolder.add({ createTriangle }, "createTriangle").name("Triangle");
  var guiControls = {
    wireframe: false,
  };
  addGeometryFolder.open();



  const exportFolder = gui.addFolder("Export");
  exportFolder.add({ exportToObj }, "exportToObj").name("export");
  exportFolder.open();

  // Add wireframe control to the GUI
  gui.add(guiControls, "wireframe").onChange(function (value) {
    // Toggle wireframe mode for the sphere material
    rectangleMesh.material.wireframe = value;
    // created.material.wireframe = value;
  });
  // gui.add(rectangleMesh.rotation, "x", 0, 2 * Math.PI);
  // gui.add(rectangleMesh.rotation, "y", 0, 2 * Math.PI);
  // gui.add(rectangleMesh.rotation, "z", 0, 2 * Math.PI);

  camera.position.z = 5;

  function saveString(text, filename) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);

  function save(blob, filename) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  function exportToObj() {
    const exporter = new OBJExporter();
    const result = exporter.parse(scene);
    console.log("fetching coordinates", result);
    // saveString(result, "object.obj");
  }

  const animate = () => {
    controls.addEventListener("dragstart", function (event) {
      event.object.material.color.set("white");
    });
    requestAnimationFrame(animate);
    // transformControls.update()
    renderer.render(scene, camera);
  };

  animate();
  return (
    <>
      <div ref={circleRef} />
    </>
  );
};

export default Circle;
